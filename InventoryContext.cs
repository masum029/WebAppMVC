using Microsoft.EntityFrameworkCore;
using WebAppMVC.Models;

namespace WebAppMVC
{
    public class InventoryContext:DbContext
    {
        public InventoryContext(DbContextOptions<InventoryContext> options):base(options)
        {
                
        }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductDetail> ProductDetails { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<ProductSupplier> ProductSuppliers { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define the one-to-one relationship between Product and ProductDetail
            modelBuilder.Entity<Product>()
                .HasOne(p => p.ProductDetail)
                .WithOne(pd => pd.Product)
                .HasForeignKey<ProductDetail>(pd => pd.ProductID); // Set ProductID as the FK and PK

            // Define the many-to-many relationship
            modelBuilder.Entity<ProductSupplier>()
                .HasKey(ps => new { ps.ProductID, ps.SupplierID });

            modelBuilder.Entity<ProductSupplier>()
                .HasOne(ps => ps.Product)
                .WithMany(p => p.ProductSuppliers)
                .HasForeignKey(ps => ps.ProductID);

            modelBuilder.Entity<ProductSupplier>()
                .HasOne(ps => ps.Supplier)
                .WithMany(s => s.ProductSuppliers)
                .HasForeignKey(ps => ps.SupplierID);
        }
    }
}
