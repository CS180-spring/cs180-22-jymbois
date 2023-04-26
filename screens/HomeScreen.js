import { View, Text, StyleSheet,ScrollView,Switch,TouchableOpacity } from "react-native";
import React from "react";
import { Button } from "react-native";
import { ref, set } from "firebase/database";
import database from "../configuration/firebaseConfig";
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = () => {

	const testDatabase = async () => {
		const dbRef = ref(database, 'Wowzers');
		await set(dbRef, 'Hello, World!');
		console.log('Data added to database!');
	  };

	return (
		<View style={styles.container}>
     
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Welcome User</Text>
          <Text style={styles.sectionText}>Today's Workout: Chest and Triceps</Text>
		  <ScrollView horizontal={true} style={styles.menu}>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Menu item 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Menu item 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Menu item 3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Menu item 4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Menu item 5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Menu item 6</Text>
            </TouchableOpacity>
          </ScrollView>
		  <Text style={styles.sectionText}>Previous Workout: </Text>
		  <ScrollView horizontal={true} style={styles.menu}>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Menu item 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Menu item 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Menu item 3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Menu item 4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Menu item 5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Menu item 6</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={styles.section}>
          <Button
            title="Test Database"
            onPress={testDatabase}
          />
        </View>
      </ScrollView>
    </View>
	);
};
const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	},
	header: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  padding: 20,
	  borderBottomWidth: 1,
	  borderBottomColor: '#ccc',
	},
	title: {
	  fontSize: 20,
	  fontWeight: 'bold',
	  marginLeft: 10,
	  
	},
	content: {
	  flex: 1,
	  padding: 20,
	},
	section: {
	  marginBottom: 20,
	},
	sectionTitle: {
	  fontSize: 18,
	  fontWeight: 'bold',
	  marginBottom: 10,
	  textAlign: 'center',
	},
	sectionText: {
	  fontSize: 16,
	},
	menu: {
		marginTop: 10,
		flexDirection: 'row',
		height: 40,
	  },
	  menuItem: {
		paddingHorizontal: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#eee',
		borderRadius: 10,
		marginRight: 10,
	  },
  });
export default HomeScreen;




