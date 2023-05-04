import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Modal,
	TextInput,
	ScrollView,
} from "react-native";
import InputSpinner from "react-native-input-spinner";
import Calendar from "react-native-calendars/src/calendar";

const CalenderScreen = () => {
	const [showModal1, setShowModal1] = useState(false);
	const [showModal2, setShowModal2] = useState(false);
	const [recordDate, setRecordDate] = useState("");
	const [text, onChangeText] = React.useState("");
	const [setWeight, onChangeWeight] = React.useState("");
	const [setReps, onChangeReps] = React.useState("");
	const [nameOfExercise, setNameOfExercise] = useState("");
	const [setNumbers, setSetNumbers] = useState(0);

	const handleNumberChange = (text) => {
		if (/^\d{0,2}$/.test(text)) {
			// Regex pattern to validate input between 1 and 100
			setSetNumbers(text);
			//console.log(setNumbers);
		}
	};

	const exitCalendarModal = () => {
		setShowModal2(false);
		setSetNumbers(0);
	};
	const handleDayPress = (day) => {
		//console.log(day.dateString);
		setRecordDate(day.dateString);
		console.log(recordDate);
		setShowModal1(false);
		setShowModal2(true);
	};

	const set = [];
	for (let i = 1; i <= setNumbers; i++) {
		set.push(
			<View style={styles.exerciseLogs} key={i}>
				<Text style={styles.textStyle}>Set {i}</Text>

				{/* <View styles={styles.log}>
					<Text style={{ color: "#8BC34A", fontWeight: 800, marginLeft: 28 }}>
						Weight
					</Text>

					<InputSpinner
						style={styles.numberInput1}
						max={1000}
						min={0}
						skin="clean"
					/>
				</View>

				<View style={{ color: "#ffff", fontWeight: 800, marginLeft: 0 }}>
					<Text style={{ color: "#ffff", fontWeight: 800, marginLeft: 23 }}>
						No. Reps
					</Text>

					<InputSpinner
						style={styles.numberInput1}
						max={1000}
						min={0}
						skin="clean"
					/>
				</View> */}

				<View style={styles.log}>
					<Text style={{ color: "black", fontWeight: 400, marginLeft: 10 }}>
						Weight
					</Text>
					<TextInput
						placeholder="Enter Weight"
						style={styles.input}
						onChangeText={onChangeWeight}
						value={setWeight}
						keyboardType="numeric"
					/>
				</View>

				{/* <View style={{ color: "#ffff", fontWeight: 800, marginLeft: 0 }}>
					<Text style={{ color: "#ffff", fontWeight: 800, marginLeft: 23 }}>
						No. Reps
					</Text>

					<InputSpinner
						style={styles.numberInput1}
						max={1000}
						min={0}
						skin="clean"
					/>
				</View> */}

				<View
					style={{
						flexDirection: "row",
						alignItems: "center",

						// marginBottom: 0,
					}}
				>
					<Text
						style={{
							color: "#fff",
							fontWeight: "bold",
							fontSize: 16,
							marginRight: -30,
						}}
					>
						No. Reps:
					</Text>
					<InputSpinner
						max={1000}
						min={0}
						step={1}
						colorMax={"#fff"}
						colorMin={"#fff"}
						color={"lightgrey"}
						height={28}
						rounded={true}
						style={{ borderColor: "lightgrey", borderWidth: 2 }}
						valueType="integer"
						showBorder
						skin="modern"
						onChange={onChangeReps}
					/>
				</View>
			</View>,
		);
	}

	return (
		<ScrollView>
			<Text style={styles.titleText}>
				Select the date to record your work out gym rat!
			</Text>
			<Calendar
				style={styles.calendar}
				onDayPress={handleDayPress}
				initialDate={"2023-04-21"}
				minDate={"2023-04-01"}
				maxDate={"2023-12-31"}
				hideExtraDays={true}
			/>

			<Modal
				visible={showModal2}
				animationType="fade"
				style={styles.exerciseLogModal}
			>
				<ScrollView>
					{recordDate && (
						<Text
							style={{
								marginTop: 100,
								marginLeft: 30,
								color: "tan",
								fontWeight: 800,
								fontSize: 50,
							}}
						>
							{recordDate}
						</Text>
					)}
					<TextInput
						placeholder="Exercise Name"
						style={styles.input}
						onChangeText={onChangeText}
						value={text}
					/>
					<View style={styles.setContainer}>
						<Text style={{ color: "lightgrey", fontSize: 16, fontWeight: 800 }}>
							No. Set
						</Text>
						<InputSpinner
							style={styles.numberInput}
							max={10}
							min={0}
							color={"#d2b48c"}
							onChange={handleNumberChange}
						/>
					</View>

					{set}

					<View style={styles.buttons}>
						<TouchableOpacity
							onPress={exitCalendarModal}
							style={styles.button2}
						>
							<Text style={styles.buttonText}>Save</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={exitCalendarModal}
							style={styles.button2}
						>
							<Text style={styles.buttonText}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</Modal>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
		margin: 20,
	},
	button1: {
		backgroundColor: "tan",
		borderRadius: 10,
		margin: 40,
		padding: 10,
		width: 1000,
		alignItems: "center",
	},
	button2: {
		backgroundColor: "tan",
		borderRadius: 10,
		margin: 40,
		padding: 10,
		width: 100,
		alignItems: "center",
	},
	buttons: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		maxWidth: "100%",
	},
	buttonText: {
		color: "white",
		fontSize: 22,
	},
	calendarModal: {
		flex: 1,
		backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
	},
	calendar: {
		borderRadius: 10,
		elevation: 4,
		width: "100%", // Set the width of the calendar to 100%
		maxWidth: 400, // Set a maximum width for the calendar
		maxHeight: 600, // Set a maximum height for the calendar
	},
	titleText: {
		color: "tan",
		fontWeight: 800,
		fontSize: 15,
		marginLeft: 5,
	},
	exerciseLogModal: {
		flex: 1,
		backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderColor: "lightgrey",
		borderRadius: 10,
	},
	numberInput: {
		width: 170,
		height: 40,
		borderWidth: 1,
		borderColor: "lightgrey",
		paddingHorizontal: 10,
		textColor: "tan",
	},
	setContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		marginTop: 10,
	},
	numberInput1: {
		width: 100,
		height: 20,
	},
	exerciseLogs: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		marginTop: 20,
		height: 100,
		borderWidth: 1,
		borderColor: "lightgrey",
		margin: 10,
		borderRadius: 20,
	},
	log: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly",
		alignItems: "center",
		marginTop: 10,
	},
	textStyle: {
		color: "tan",
		fontWeight: 800,
	},
});

export default CalenderScreen;

/*
<View style={styles.exerciseLogs}>
        <Text style={styles.textStyle}>Set {setNumbers}</Text>
          
          <View styles={styles.log}>
            <Text style={{color: "tan", fontWeight:800, marginLeft: 28}}>Weight</Text>
            
            <InputSpinner style={styles.numberInput1}
            max={1000}
            min={0}
            skin="clean"
            />
            </View >

            <View style={{color: "tan", fontWeight:800, marginLeft:0}}>
            <Text style={{color: "tan", fontWeight:800, marginLeft: 23}}>No. Reps</Text>
            
            <InputSpinner style={styles.numberInput1}
            max={1000}
            min={0}
            skin="clean"
            />
            </View>
        </View>
*/
