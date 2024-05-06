using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using Microsoft.AspNetCore.Authentication.JwtBearer;




[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;


    public UsersController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public class CreateUserModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }




    [HttpPost]
    [Route("createuser")]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserModel model)
    {

        if (model.Username == null || model.Password == null)
        {
            return BadRequest();
        }
        var user = new ApplicationUser { UserName = model.Username };

        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            return Ok(new { message = "User created successfully." });
        }
        else
        {
            return BadRequest("Failed to create user: " + string.Join(", ", result.Errors.Select(e => e.Description)));
        }
    }

        [HttpGet("username")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public IActionResult GetUsername()
    {
        if (User?.Identity?.IsAuthenticated == true)
        {
            // Retrieve the user's username from the claims
            var usernameClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name);
            if (usernameClaim != null)
            {
                var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                var username = usernameClaim.Value;
                var data = new { User = username, UserId = userId };
                return Ok(data);
            }
            else
            {
                return BadRequest("Username claim not found.");
            }
        }
        else
        {
            return Unauthorized("User is not authenticated.");
        }
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {

        if (model.Username == null || model.Password == null)
        {
            return BadRequest("User or Password is null");
        }

        var user = await _userManager.FindByNameAsync(model.Username);
        var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, false, lockoutOnFailure: false);

        if (result.Succeeded)
        {
            // Generate JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var IssuerSigningKey = Encoding.UTF8.GetBytes("DB121393-5B05-4222-83DD-7EA3C2CE1922");
           
            // Specify audience and issuer
            string audience = "dungeonApp"; // Replace with your actual audience
            string issuer = "dungeonapi.azurewebsites.net"; // Replace with your actual issuer

            // Define token descriptor with audience and issuer claims
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.Name, model.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id)

            }),
                Expires = DateTime.UtcNow.AddDays(7),
                NotBefore = DateTime.UtcNow, // Token expiration time
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(IssuerSigningKey), SecurityAlgorithms.HmacSha256Signature),
                Audience = audience,
                Issuer = issuer
            };

       
            // Create and encode JWT token
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);



            // Return token in JSON response
            var response = new { token = tokenString };
            return Ok(response);
        }
        else
        {
         
            return BadRequest("Login failed.");
        }
    }



}