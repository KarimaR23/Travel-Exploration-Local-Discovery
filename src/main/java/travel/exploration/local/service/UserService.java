package travel.exploration.local.service;

import org.springframework.stereotype.Service;
import travel.exploration.local.model.User;
import travel.exploration.local.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Create
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // Read all
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Read one
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Delete
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}