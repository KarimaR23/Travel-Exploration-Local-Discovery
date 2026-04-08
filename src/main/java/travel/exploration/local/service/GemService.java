package travel.exploration.local.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import travel.exploration.local.model.Gem;
import travel.exploration.local.repository.GemRepository;

import java.util.List;

@Service
public class GemService {

    private final GemRepository gemRepository;

    @Autowired
    public GemService(GemRepository gemRepository) {
        this.gemRepository = gemRepository;
    }


    public Gem saveGem(Gem gem) {

        if (gem.getTitle() == null || gem.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Gem title cannot be empty");
        }
        return gemRepository.save(gem);
    }


    public List<Gem> findAllGems() {
        return gemRepository.findAll();
    }

    public List<Gem> findGemsByCategory(String categoryName) {
        return gemRepository.findByCategoryName(categoryName);
    }

    // READ: Find a specific gem by ID
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


    public void deleteGemById(Long id) {
        if (!gemRepository.existsById(id)) {
            throw new RuntimeException("Cannot delete: Gem not found");
        }
        gemRepository.deleteById(id);
    }
}