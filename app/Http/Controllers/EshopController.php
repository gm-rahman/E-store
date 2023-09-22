<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\OthersImage;
use App\Models\Product;
use Illuminate\Http\Request;
use DB;

class EshopController extends Controller
{
    public $categories;

    public function index() {
//        return DB::table('categories')->get();
        return view('frontEnd.home.home', [
            'new_arrival_products' => Product::where('featured_status',1)->get(),
            'explore_products' => Product::where('featured_status',0)->get(),
        ]);
    }
    public function products(){
        return view('frontEnd.product.product',[
            'products' => Product::all(),
        ]);
    }
    public function productDetails($id){
        return view('frontEnd.product.product-details',[
            'product' => Product::find($id),
            'othersImage' => OthersImage::where('product_id',$id)->get()
        ]);
    }

    public function categoryProducts($id) {
        return view('frontEnd.category.index',[
            'products' => Product::where('category_id',$id)->get(),
            'catId' => $id
        ]);
    }


}
