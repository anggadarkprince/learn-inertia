<?php

namespace App\Http\Controllers;

use App\Http\Requests\Categories\StoreCategoryRequest;
use App\Http\Requests\Categories\UpdateCategoryRequest;
use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct(private readonly CategoryService $categoryService)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = $this->categoryService->getAllPaginated($request);

        return inertia("Categories/Index", compact("categories"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Categories/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $category = $this->categoryService->create($request->validated());

        return to_route('categories.index')->with([
            'status' => 'success',
            'message' => __('Category :category successfully created', [
                'category' => $category->category
            ]),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return inertia("Categories/Show", compact("category"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return inertia("Categories/Edit", compact("category"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $this->categoryService->update($category, $request->validated());

        return to_route('categories.index')->with([
            'status' => 'success',
            'message' => __('Category :category successfully updated', ['category' => $category->category]),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $this->categoryService->delete($category);

        return redirect()->back()->with([
            'status' => 'warning',
            'message' => __('Category :category successfully deleted', ['category' => $category->category])
        ]);
    }
}
