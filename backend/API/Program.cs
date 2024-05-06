using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Threading.Tasks;
using API;
using System.Text.Json.Serialization; // Add this using directive




var builder = WebApplication.CreateBuilder(args);

// Configure services
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "dungeonapi.azurewebsites.net",
            ValidAudience = "dungeonApp",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("DB121393-5B05-4222-83DD-7EA3C2CE1922"))
        };
    });

builder.Services.AddScoped<ChapterService>();
builder.Services.AddScoped<SceneService>();
builder.Services.AddScoped<MonsterService>();
builder.Services.AddScoped<LocationService>();
builder.Services.AddScoped<CharacterService>();
builder.Services.AddScoped<PlayerService>();
builder.Services.AddScoped<CampaignService>();
builder.Services.AddScoped<NPCService>();
builder.Services.AddScoped<QuestService>();
builder.Services.AddScoped<ItemService>();

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
});

builder.Services.AddCors(options =>
    {
    options.AddPolicy("AllowMyOrigin",
        builder => builder.WithOrigins("http://localhost:4200")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});


var app = builder.Build();

// Add CORS middleware
app.UseCors(builder =>
{
    builder.WithOrigins("http://localhost:4200", "https://localhost:4200")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()
        .WithMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Define allowed methods including OPTIONS
        .WithHeaders("X-Custom-Header"); // Allow specific custom headers
});

app.UseCors("AllowMyOrigin");


// Build the app


// Configure the HTTP request pipeline
app.UseHttpsRedirection(); // HTTPS redirection middleware
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();




app.MapControllers();

// Run the app
app.Run();
