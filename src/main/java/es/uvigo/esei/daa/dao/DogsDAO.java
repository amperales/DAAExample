package es.uvigo.esei.daa.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.List;

import es.uvigo.esei.daa.entities.Dog;

public class DogsDAO extends DAO {
	public Dog get(int id)
	throws DAOException, IllegalArgumentException {
		try (final Connection conn = this.getConnection()) {
			final String query = "SELECT * FROM dogs WHERE id=?";
			
			try (PreparedStatement statement = conn.prepareStatement(query)) {
				statement.setInt(1, id);
				
				try (ResultSet result = statement.executeQuery()) {
					if (result.next()) {
						return new Dog(
							result.getInt("id"),
							result.getString("name"),
							result.getString("breed")
						);
					} else {
						throw new IllegalArgumentException("Invalid id");
					}
				}
			}
		} catch (SQLException e) {
			throw new DAOException(e);
		}
	}
	
	public List<Dog> list() throws DAOException {
		try (final Connection conn = this.getConnection()) {
			try (Statement statement = conn.createStatement()) {
				try (ResultSet result = statement.executeQuery("SELECT * FROM dogs")) {
					final List<Dog> dogs = new LinkedList<>();
					
					while (result.next()) {
						dogs.add(new Dog(
							result.getInt("id"),
							result.getString("name"),
							result.getString("breed")
						));
					}
					
					return dogs;
				}
			}
		} catch (SQLException e) {
			throw new DAOException(e);
		}
	}
	
	public void delete(int id)
	throws DAOException, IllegalArgumentException {
		try (final Connection conn = this.getConnection()) {
			final String query = "DELETE FROM dogs WHERE id=?";
			
			try (PreparedStatement statement = conn.prepareStatement(query)) {
				statement.setInt(1, id);
				
				if (statement.executeUpdate() != 1) {
					throw new IllegalArgumentException("Invalid id");
				}
			}
		} catch (SQLException e) {
			throw new DAOException(e);
		}
	}
	
	public Dog modify(int id, String name, String breed)
	throws DAOException, IllegalArgumentException {
		if (name == null || breed == null) {
			throw new IllegalArgumentException("name and breed can't be null");
		}
		
		try (final Connection conn = this.getConnection()) {
			final String query = "UPDATE dogs SET name=?, breed=? WHERE id=?";
			
			try (PreparedStatement statement = conn.prepareStatement(query)) {
				statement.setString(1, name);
				statement.setString(2, breed);
				statement.setInt(3, id);
				
				if (statement.executeUpdate() == 1) {
					return new Dog(id, name, breed); 
				} else {
					throw new IllegalArgumentException("name and breed can't be null");
				}
			}
		} catch (SQLException e) {
			throw new DAOException();
		}
	}
	
	public Dog add(String name, String breed)
	throws DAOException, IllegalArgumentException {
		if (name == null || breed == null) {
			throw new IllegalArgumentException("name and breed can't be null");
		}
		
		try (final Connection conn = this.getConnection()) {
			final String query = "INSERT INTO dogs VALUES(null, ?, ?)";
			
			try (PreparedStatement statement = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
				statement.setString(1, name);
				statement.setString(2, breed);
				
				if (statement.executeUpdate() == 1) {
					try (ResultSet resultKeys = statement.getGeneratedKeys()) {
						if (resultKeys.next()) {
							return new Dog(resultKeys.getInt(1), name, breed);
						} else {
							throw new SQLException("Error retrieving inserted id");
						}
					}
				} else {
					throw new SQLException("Error inserting value");
				}
			}
		} catch (SQLException e) {
			throw new DAOException(e);
		}
	}
}
