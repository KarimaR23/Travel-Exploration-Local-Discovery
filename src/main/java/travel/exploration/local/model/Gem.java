package travel.exploration.local.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "gems")
public class Gem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Size(max = 150)
    private String title;

    @Column(columnDefinition = "TEXT")
    @Size(max = 2000)
    private String description;

    @NotNull(message = "Latitude is required")
    @Min(value = -90)
    @Max(value = 90)
    private Double latitude;

    @NotNull(message = "Longitude is required")
    @Min(value = -180)
    @Max(value = 180)
    private Double longitude;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;

    public Gem() {
    }

    public Gem(String title, String description, Double latitude, Double longitude, Category category) {
        this.title = title;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) { this.id = id; }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) { this.title = title; }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) { this.description = description; }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) { this.category = category; }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) { this.creator = creator; }
}
