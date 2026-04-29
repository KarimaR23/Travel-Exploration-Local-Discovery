package travel.exploration.local.controller;

import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import travel.exploration.local.model.Gem;
import travel.exploration.local.service.GemService;

import java.util.List;

@RestController
@RequestMapping("/api/gems")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://10.0.0.216:5173"
})
public class GemController {

    private final GemService gemService;

    public GemController(GemService gemService) {
        this.gemService = gemService;
    }

    @GetMapping
    public List<Gem> getAllGems() {
        return gemService.findAllGems();
    }

    @GetMapping("/filter")
    public List<Gem> getGemsByCategory(@RequestParam String category) {
        return gemService.findGemsByCategory(category);
    }

    @GetMapping("/{id}")
    public Gem getGemById(@PathVariable Long id) {
        return gemService.getGemById(id);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public Gem addGem(@Valid @RequestBody Gem gem) {
        return gemService.saveGem(gem);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/{id}")
    public Gem updateGem(@PathVariable Long id, @RequestBody Gem gem) {
        return gemService.updateGem(id, gem);
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{id}")
    public void deleteGem(@PathVariable Long id) {
        gemService.deleteGemById(id);
    }
}