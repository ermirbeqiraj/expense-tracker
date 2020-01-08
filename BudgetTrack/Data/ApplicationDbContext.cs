using BudgetTrack.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;

namespace BudgetTrack.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<ExpenseGroup> ExpenseGroup { get; set; }
        public DbSet<ExpenseCategory> ExpenseCategory { get; set; }
        public DbSet<Expense> Expenses { get; set; }


        internal void Seed(UserManager<IdentityUser> userManager)
        {
            var dbExists = Database.GetService<IRelationalDatabaseCreator>().Exists();
            if (!dbExists)
            {
                this.Database.EnsureCreated();
            }

            var user = new IdentityUser
            {
                UserName = "admin",
                Email = "admin@expense-track.admin"
            };

            userManager.CreateAsync(user, "P4$$w0rd").ConfigureAwait(false).GetAwaiter().GetResult();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            //
            // pe: primary entity
            // se: secondary entity
            // fk: foreign key
            //

            builder.Entity<ExpenseCategory>(entity =>
            {
                entity.HasOne(pe => pe.ExpenseGroup)
                        .WithMany(se => se.ExpenseCategory)
                        .HasForeignKey(fk => fk.ExpenseGroupId)
                        .OnDelete(DeleteBehavior.Restrict);
            });

            builder.Entity<Expense>(entity =>
            {
                entity.Property(p => p.Active).HasDefaultValue(true);

                entity.Property(p => p.Ammount).HasColumnType("DECIMAL(16,2)");

                entity.HasQueryFilter(x => x.Active == true);

                entity.HasOne(pe => pe.ExpenseCategory)
                        .WithMany(se => se.Expense)
                        .HasForeignKey(fk => fk.ExpenseCategoryId)
                        .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
