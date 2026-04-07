package travel.exploration.local.repository;

import travel.exploration.local.model.User;
import java.util.List;
import java.util.Optional;

public interface UserRepository {

    User save(User user);

    List<User> findAll();

    Optional<User> findById(Long id);

    void deleteById(Long id);
}