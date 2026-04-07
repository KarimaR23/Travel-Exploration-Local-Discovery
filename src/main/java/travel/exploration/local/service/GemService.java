package travel.exploration.local.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import travel.exploration.local.model.Gem;
import travel.exploration.local.repository.GemRepository;

import java.util.List;
import java.util.Optional;

@Service
public class GemService {

    private final GemRepository gemRepository;

    @Autowired
    public GemService(GemRepository gemRepository) {
        this.gemRepository = gemRepository;
    }

    // CREATE: Logic for "Gem Submission" [cite: 17, 30, 37]
    public Gem saveGem(Gem gem) {
        // Business logic: Ensure the gem has a title before saving
        if (gem.getTitle() == null || gem.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Gem title cannot be empty");
        }
        return gemRepository.save(gem);
    }

    // READ: Get all gems for the Discovery Feed [cite: 18, 31, 36]
    public List<Gem> findAllGems() {
        return gemRepository.findAll();
    }

    // READ: Filter by category (e.g., Nature, Art, Food) [cite: 18, 31, 71]
    public List<Gem> findGemsByCategory(String categoryName) {
        return gemRepository.findByCategoryName(categoryName);
    }

    // READ: Find a specific gem by ID [cite: 72]
    public Gem getGemById(Long id) {
        return gemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Gem not found with id: " + id));
    }

    // UPDATE: Update gem details (Optional but part of CRUD)
    public Gem updateGem(Long id, Gem updatedGem) {
        Gem existingGem = getGemById(id);
        existingGem.setTitle(updatedGem.getTitle());
        existingGem.setDescription(updatedGem.getDescription());
        existingGem.setLatitude(updatedGem.getLatitude());
        existingGem.setLongitude(updatedGem.getLongitude());
        existingGem.setCategory(updatedGem.getCategory());
        return gemRepository.save(existingGem);
    }

    // DELETE: Remove a gem from the system
    public void deleteGemById(Long id) {
        if (!gemRepository.existsById(id)) {
            throw new RuntimeException("Cannot delete: Gem not found");
        }
        gemRepository.deleteById(id);
    }
}