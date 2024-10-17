package org.acme;

import java.util.List;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

@Path("/creatures")
public class CreaturesResource {

    public static class creatureEntity {
        private String name;
        private String description;
        private String skills;
        private String items;

        public String getName() { return name; }
        public void setName(String name) {
            this.name = name;
        }
        public String getDescription() { return description; }
        public void setDescription(String description) {
            this.description = description;
        }
        public String getSkills() { return skills; }
        public void setSkills(String skills) {
            this.skills = skills;
        }
        public String getItems() { return items; }
        public void setItems(String items) {
            this.items = items;
        }
    }

    @Path("/create")
    @POST
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(creatureEntity c) {
        Creature entity = new Creature(c.getName(), c.getDescription(), c.getSkills(), c.getItems());
        entity.persist();
        return Response.status(Status.CREATED).build();
    }

    @Path("/read")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Creature> read() {
        return Creature.listAll();
    }

    @Path("/update/{name}")
    @PATCH
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("name") String name, creatureEntity c) {
        Creature entity = Creature.findByName(name);
        if (entity == null) {
            return Response.status(Status.NOT_FOUND).build();
        }
        entity.setDescription(c.getDescription());
        entity.setSkills(c.getSkills());
        entity.setItems(c.getItems());
        entity.persist();
        return Response.status(Status.NO_CONTENT).build();
    }

    @Path("/read/{name}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Creature read(@PathParam("name") String name) {
        return Creature.findByName(name);
    }
}