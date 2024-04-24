using Microsoft.AspNetCore.Mvc;

namespace WebAppMVC.Controllers
{
    public class CategoryController : Controller
    {
        private readonly InventoryContext _inventoryContext;
        public CategoryController(InventoryContext inventoryContext)
        {
            _inventoryContext = inventoryContext;
        }
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult CategryList()
        {
            var data= _inventoryContext.Categories.ToList();
            return new JsonResult (data);
        }

    }
}
