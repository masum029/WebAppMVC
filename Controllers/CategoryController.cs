using Microsoft.AspNetCore.Mvc;
using WebAppMVC.Models;

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
            var data = _inventoryContext.Categories.ToList();
            return new JsonResult(data);
        }


        public JsonResult Insert(Category category)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _inventoryContext.Add(category);
                    _inventoryContext.SaveChanges();
                    return Json("Category Saved Successfully");
                }
                return Json("Modal Validation Failed");

            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet]
        public JsonResult Edit(int id)
        {
            var category = _inventoryContext.Categories.FirstOrDefault(x => x.CategoryID == id);
            return Json(category);
        }

        [HttpPost]
        public JsonResult Update(Category category) {
            try
            {
                if (ModelState.IsValid)
                {
                    _inventoryContext.Categories.Update(category);
                    _inventoryContext.SaveChanges();
                    return Json("Product Details Updated.");
                }
                return Json("Update Failed");
            }
            catch (Exception)
            {

                throw;
            }
        }
        //public JsonResult Delete(int id)
        //{
        //    var category = _inventoryContext.Categories.Find(x => x.CategoryID == id);
        //    return Json(category);
        //}
    }
}
