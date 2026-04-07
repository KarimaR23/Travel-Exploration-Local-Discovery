package travel.exploration.local.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import travel.exploration.local.model.Gem;
import java.util.List;

@Repository
public interface GemRepository extends JpaRepository<Gem, Long> {

    // Custom method design for filtering by Category
    List<Gem> findByCategoryName(String categoryName);
}