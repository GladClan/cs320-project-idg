package org.acme;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/hello")
public class GreetingResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello RESTEasy";
    }

    @Path("/name/{name}")
    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public String helloName(@PathParam("name") String name) {
        UserName userName = new UserName(name);
        userName.persist();
        return "Hello " + name + "! Your name has been stored in the database.";
    }

    @Path("/name/list")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String helloNameList() {
        return UserName.listAll().toString().length() < 3 ? "No names stored in the database." : UserName.listAll().toString();
    }

    @Path("/name/update/{name}/{new}")
    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public String helloNameUpdate(@PathParam("name") String name, @PathParam("new") String newName) {
        if (UserName.find("name", name).list().isEmpty()) {
            return String.format("Sorry %s, the name %s does not exist in the database.", newName, name);
        }
        UserName userName = UserName.find("name", name).firstResult();
        userName.name = newName;
        userName.persist();
        return "Hello " + newName + "! Your name has been updated in the database.";
    }

    @Path("/name/remove/{name}") 
    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public String helloNameDelete(@PathParam("name") String name) {
        if (UserName.find("name", name) == null) {
            return String.format("The name '%s'does not exist in the database.", name);
        }
        UserName userName = UserName.find("name", name).firstResult();
        userName.delete();
        return String.format("The name %s has been deleted from the database.", name);
    }
    
    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/name")
    public String helloPost(Person p) {
        return "Hello " + p.getFirst() + " " + p.getLast();
    }

    public static class Person {
        private String first;
        private String last;

        public String getFirst() { return first; }
        public void setFirst(String first){
            this.first = first;
        }
        public String getLast() { return last; }
        public void setLast(String last){
            this.last = last;
        }
    }
}
