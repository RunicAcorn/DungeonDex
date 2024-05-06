using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using API;





public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    { }
    public DbSet<ApplicationUser> ApplicationUsers { get; set; }
    public DbSet<Campaign> Campaigns { get; set; }
    public DbSet<Chapter> Chapters{get; set; }
    public DbSet<Monster> Monsters { get; set; }
    public DbSet<Scene> Scenes { get; set; }

    public DbSet<Location> Locations { get; set; }
    public DbSet<NPC> NPCs { get; set; }
    public DbSet<Character> Characters { get; set; }
    public DbSet<Item> Items { get; set; }
    public DbSet<Quest> Quests { get; set; }
    public DbSet<Player> Players { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ApplicationUser>().ToTable("Users");
        modelBuilder.Entity<Campaign>().ToTable("Campaigns");
        modelBuilder.Entity<Chapter>().ToTable("Chapter"); 
        modelBuilder.Entity<Scene>().ToTable("Scene");
        modelBuilder.Entity<Monster>().ToTable("Monster");
        modelBuilder.Entity<NPC>().ToTable("NPC");
        modelBuilder.Entity<Character>().ToTable("Character");
        modelBuilder.Entity<Quest>().ToTable("Quest");
        modelBuilder.Entity<Location>().ToTable("Location");
        modelBuilder.Entity<Player>().ToTable("Player");
        modelBuilder.Entity<Item>().ToTable("Item");
        modelBuilder.Entity<Weapon>();
        modelBuilder.Entity<Potion>();

    
        
        modelBuilder.Entity<Campaign>()
       .HasMany(c => c.Chapters) 
       .WithOne(e => e.Campaign)
       .OnDelete(DeleteBehavior.Cascade);

      






        modelBuilder.Entity<Campaign>().HasMany(c => c.Monsters).WithOne(e => e.Campaign).OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<Campaign>().HasMany(c => c.NPCs).WithOne(e => e.Campaign).OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<Campaign>().HasMany(c => c.Quests).WithOne(e => e.Campaign).OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<Campaign>().HasMany(c => c.Locations).WithOne(e => e.Campaign).OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<Campaign>().HasMany(c => c.Players).WithOne(e => e.Campaign).OnDelete(DeleteBehavior.Cascade);
      


        modelBuilder.Entity<Quest>().HasOne(q => q.StartLocation).WithMany(l => l.Quests).OnDelete(DeleteBehavior.NoAction);


        modelBuilder.Entity<Player>()
            .HasOne(p => p.CurrentCharacter)
            .WithOne(c => c.OwnedBy)
            .HasForeignKey<Character>(c => c.OwnedById) // Specify the foreign key
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Chapter>().HasMany(c => c.Scenes).WithOne(e => e.Chapter).OnDelete(DeleteBehavior.Cascade);

    }
}
