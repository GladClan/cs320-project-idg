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
import jakarta.ws.rs.Encoded;

@Path("/creatures")
public class CreaturesResource {

    public static class creatureEntity {
        private String name;
        private String description;
        private String skills;
        private String items;

        public String getName() { return name; }
        public String getDescription() { return description; }
        public String getSkills() { return skills; }
        public String getItems() { return items; }
    }

    // Creates a new creature in the database using JSON body parameters
    @Path("/create")
    @POST
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(creatureEntity c) {
        Creature entity = new Creature(c.getName(), c.getDescription(), c.getSkills(), c.getItems());
        entity.persist();
        return Response.status(Status.CREATED).entity("Creature " + c.getName() + ", " + c.getDescription() + " created successfully.").build();
    }

    // Returns all the creatures stored in the database
    @Path("/read")
    @PATCH
    @Produces(MediaType.APPLICATION_JSON)
    public List<Creature> read() {
        return Creature.listAll();
    }

    // Returns a specific creature stored in the database using a path parameter
    @Path("/read/{name}")
    @PATCH
    @Produces(MediaType.APPLICATION_JSON)
    public Creature read(@Encoded @PathParam("name") String name) {
        return Creature.findByName(name);
    }

    // Updates a specific creature stored in the database using a path parameter
    @Path("/update/")
    @PATCH
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(Long id, creatureEntity c) {
        Creature entity = Creature.findById(id);
        if (entity == null) {
            return Response.status(Status.NOT_FOUND).build();
        }
        entity.setDescription(c.getDescription());
        entity.setSkills(c.getSkills());
        entity.setItems(c.getItems());
        entity.persist();
        return Response.status(Status.OK).entity("Patch successful").build();
    }

    // Deletes a specific creature stored in the database using JSON body parameters to identify the creature by its name
    @Path("/delete")
    @DELETE
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(creatureEntity c) {
        Creature entity = Creature.findByName(c.getName());
        if (entity == null) {
            return Response.status(Status.NOT_FOUND).entity("Could not find creature name " + c.getName()).build();
        }
        entity.delete();
        return Response.status(Status.OK).entity("Creature " + c.getName() + " successfully deleted").build();
    }
}