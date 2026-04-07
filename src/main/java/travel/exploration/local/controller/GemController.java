package travel.exploration.local.controller;

import org.springframework.web.bind.annotation.*;
import travel.exploration.local.model.Gem;
import travel.exploration.local.service.GemService;
import java.util.List;

@RestController
@RequestMapping("/api/gems")
public class GemController {

    private final GemService gemService;

    public GemController(GemService gemService) {
        this.gemService = gemService;
    }

    // READ: Get all gems for the map view
    @GetMapping
    public List<Gem> getAllGems() {
        return gemService.findAllGems();
    }

    // READ: Filter gems by category (Nature, Art, Food)
    @GetMapping("/filter")
    public List<Gem> getGemsByCategory(@RequestParam String category) {
        return gemService.findGemsByCategory(category);
    }

    // CREATE: User pins a new location
    @PostMapping
    public Gem addGem(@RequestBody Gem gem) {
        return gemService.saveGem(gem);
    }

    // DELETE: Remove a gem (Service-layer requirement)
    @DeleteMapping("/{id}")
    public void deleteGem(@PathVariable Long id) {
        gemService.deleteGemById(id);
    }
}