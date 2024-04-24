using System;
using System.Collections.Generic;


namespace WebAppMVC.Models
{
    public class Category
    {
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }

        // One-to-Many relationship
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }

    public class Product
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }

        public int? CategoryID { get; set; }
        public Category Category { get; set; }

        // One-to-One relationship
        public ProductDetail ProductDetail { get; set; }

        // Many-to-Many relationship
        public ICollection<ProductSupplier> ProductSuppliers { get; set; } = new List<ProductSupplier>();
    }

    public class ProductDetail
    {
        public int ProductDetailId {  get; set; }
        public string Description { get; set; }
        public decimal Weight { get; set; }

        public int ProductID { get; set; }
        public Product Product { get; set; }
    }

    public class Supplier
    {
        public int SupplierID { get; set; }
        public string SupplierName { get; set; }

        // Many-to-Many relationship
        public ICollection<ProductSupplier> ProductSuppliers { get; set; } = new List<ProductSupplier>();
    }

    public class ProductSupplier
    {
        public int ProductSupplierMapId {  get; set; }
        public int ProductID { get; set; }
        public Product Product { get; set; }

        public int SupplierID { get; set; }
        public Supplier Supplier { get; set; }
    }

}
