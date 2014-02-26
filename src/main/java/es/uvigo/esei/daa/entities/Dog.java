package es.uvigo.esei.daa.entities;

public class Dog {
	private int id;
	private String name;
	private String breed;
	
	public Dog() {
	}
	
	public Dog(int id, String name, String breed) {
		this.id = id;
		this.name = name;
		this.breed = breed;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBreed() {
		return breed;
	}

	public void setBreed(String breed) {
		this.breed = breed;
	}
}

