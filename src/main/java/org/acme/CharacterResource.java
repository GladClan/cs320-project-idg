package org.acme;

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

@Path("/character")
public class CharacterResource {

    public static class CharacterEntity {
        private String name;
        private String description;
        private String skills;
        private String items;

        public String getName() { return name; }
        public String getDescription() { return description; }
        public String getSkills() { return skills; }
        public String getItems() { return items; }
    }

    @Path("/create")
    @POST
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(CharacterEntity c) {
        if (Character.findByName(c.name) != null) {
            return Response.status(Status.CONFLICT).entity("Character " + c.getName() + " already exists.").build();
        }
        Character entity = new Character(c.getName(), c.getDescription(), c.getSkills(), c.getItems());
        entity.persist();
        return Response.status(Status.CREATED).entity("Character " + c.getName() + ", " + c.getDescription() + " created successfully.").build();
    }

    @Path("/edit")
    @PATCH
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public Response edit(CharacterEntity c) {
        Character entity = Character.findByName(c.getName());
        if (entity == null) {
            return Response.status(Status.NOT_FOUND).entity("Character " + c.getName() + " not found.").build();
        }
        entity.setDescription(c.getDescription());
        entity.setSkills(c.getSkills());
        entity.setItems(c.getItems());
        entity.persist();
        return Response.status(Status.OK).entity("Character " + c.getName() + " updated successfully.").build();
    }
}
