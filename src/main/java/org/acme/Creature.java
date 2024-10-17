package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "creatures")
public class Creature extends PanacheEntity {
    private String name;
    private String description;
    private String skills;
    private String items;

    public Creature() {}

    public Creature(String name, String description, String skills, String items) {
        this.name = name;
        this.description = description;
        this.skills = skills;
        this.items = items;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getSkills() {
        return skills;
    }
    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getItems() {
        return items;
    }
    public void setItems(String items) {
        this.items = items;
    }

    public static Creature findByName(String name) {
        return find("name", name).firstResult();
    }

    @Override
    public String toString() {
        return String.format("Creature{id=%d, name='%s', description='%s', skills='%s', items='%s'}", id, name, description, skills, items);
    }
}