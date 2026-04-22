package travel.exploration.local.service;

import org.springframework.stereotype.Service;
import travel.exploration.local.model.Category;
import travel.exploration.local.model.Gem;
import travel.exploration.local.model.User;
import travel.exploration.local.repository.CategoryRepository;
import travel.exploration.local.repository.GemRepository;
import travel.exploration.local.repository.UserRepository;

import java.util.List;

@Service
public class GemService {

    private final GemRepository gemRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public GemService(GemRepository gemRepository,
                      CategoryRepository categoryRepository,
                      UserRepository userRepository) {
        this.gemRepository = gemRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public Gem saveGem(Gem gem) {
        if (gem.getTitle() == null || gem.getTitle().isBlank()) {
            throw new IllegalArgumentException("Gem title cannot be empty");
        }

        Category category = categoryRepository.findById(gem.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        User creator = userRepository.findById(gem.getCreator().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        gem.setCategory(category);
        gem.setCreator(creator);

        return gemRepository.save(gem);
    }

    public List<Gem> findAllGems() {
        return gemRepository.findAll();
    }

    public List<Gem> findGemsByCategory(String categoryName) {
        return gemRepository.findByCategoryName(categoryName);
    }

    public Gem getGemById(Long id) {
        return gemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Gem not found with id: " + id));
    }

    public Gem updateGem(Long id, Gem updatedGem) {
        Gem existingGem = getGemById(id);
        existingGem.setTitle(updatedGem.getTitle());
        existingGem.setDescription(updatedGem.getDescription());
        existingGem.setLatitude(updatedGem.getLatitude());
        existingGem.setLongitude(updatedGem.getLongitude());
        existingGem.setCategory(updatedGem.getCategory());
        existingGem.setCreator(updatedGem.getCreator());
        return gemRepository.save(existingGem);
    }

    public void deleteGemById(Long id) {
        if (!gemRepository.existsById(id)) {
            throw new RuntimeException("Cannot delete: Gem not found");
        }
        gemRepository.deleteById(id);
    }
}