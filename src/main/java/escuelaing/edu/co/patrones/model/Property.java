package escuelaing.edu.co.patrones.model;

import jakarta.persistence.*;

/**
 * Entity representing a Property in the system.
 * This class maps to a database table and contains attributes related to properties such as
 * address, price, size, and description.
 */
@Entity
public class Property {

    /**
     * The unique identifier for the Property.
     * Automatically generated by the database using an auto-increment strategy.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String address;
    private Double price;
    private Double size;
    private String description;
    
    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getSize() {
        return size;
    }

    public void setSize(Double size) {
        this.size = size;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
