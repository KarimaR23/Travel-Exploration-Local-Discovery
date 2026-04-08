package travel.exploration.local.service;

import org.springframework.stereotype.Service;
import travel.exploration.local.model.Category;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {

    private final List<Category> categories = new ArrayList<>();
    private Long nextId = 1L;

    public Category createCategory(Category category) {
        category.setId(nextId++);
        categories.add(category);
        return category;
    }

    public List<Category> getAllCategories() {
        return categories;
    }

    public Category getCategoryById(Long id) {
        for (Category category : categories) {
            if (category.getId().equals(id)) {
                return category;
            }
        }
        return null;
    }

    public Category updateCategory(Long id, Category updatedCategory) {
        for (Category category : categories) {
            if (category.getId().equals(id)) {
                category.setName(updatedCategory.getName());
                category.setDescription(updatedCategory.getDescription());
                category.setGems(updatedCategory.getGems());
                return category;
            }
        }
        return null;
    }
//
    public void deleteCategory(Long id) {
        categories.removeIf(category -> category.getId().equals(id));
    }
}