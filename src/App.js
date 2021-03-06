import React, { Component } from 'react';
import styles from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
	state = {
		persons: [
			{ id: 'asf1', name: 'Max', age: 28 },
			{ id: 'asf2', name: 'Manu', age: 29 },
			{ id: 'asf3', name: 'Stefanie', age: 26 }
		],
		otherState: 'some other value',
		showPersons: false
	}

	nameChangedHandler = (event, id) => {
		const personIndex = this.state.persons.findIndex(p => {
			return p.id === id;
		});

		const person = {
			...this.state.persons[personIndex]
		};

		// const person = Object.assign({}, this.state.persons[personIndex]);

		person.name = event.target.value;

		const persons = [...this.state.persons];
		persons[personIndex] = person;

		this.setState({
			persons: persons
		});
	}

	deletePersonHandler = (personIndex) => {
		// const persons = this.state.persons.slice();
		const persons = [...this.state.persons];
		persons.splice(personIndex, 1);
		this.setState({persons: persons});
	}

	togglePersonsHandler = () => {
		const doesShow = this.state.showPersons;
		this.setState({showPersons: !doesShow});
	}

	render() {

		let persons = null;
		let btnClass = '';

		if (this.state.showPersons) {
			persons = (
				<div>
					{this.state.persons.map((person, index) => {
						return <ErrorBoundary key={person.id}>
							<Person
								click={this.deletePersonHandler.bind(this, index)}
								name={person.name}
								age={person.age}
								key={person.id}
								changed={(event) => this.nameChangedHandler(event, person.id)} />
							</ErrorBoundary>
					})}
				</div>
			);

			btnClass = styles.Red;
		}

		const classes = [];
		if (this.state.persons.length <= 2) {
			classes.push(classes.red); // classes = ['red']
		}
		if (this.state.persons.length <= 1) {
			classes.push(classes.bold); // classes = ['red', 'bold']
		}

		return (
			  <div className={styles.App}>
			    <h1>Hi, I'm a React App</h1>
					<p className={classes.join(' ')}>This is really working!</p>
					<button
						className={btnClass}
						onClick={this.togglePersonsHandler}>Toggle Persons</button>
					{persons}
			  </div>
		);
		// return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));

		// Ternary statement
		// {(this.state.showPersons) ?
		// 	<div>
		// 		<Person
		// 			name={this.state.persons[0].name}
		// 			age={this.state.persons[0].age}
		// 		/>
		// 		<Person
		// 			name={this.state.persons[1].name}
		// 			age={this.state.persons[1].age}
		// 			click={this.switchNameHandler.bind(this, 'Max!')}
		// 			changed={this.nameChangedHandler}
		// 		>My Hobbies: Racing</Person>
		// 		<Person
		// 			name={this.state.persons[2].name}
		// 			age={this.state.persons[2].age}
		// 		/>
		// 	</div> : null
		// }

		// <Person
		// 	name={this.state.persons[0].name}
		// 	age={this.state.persons[0].age}
		// />
		// <Person
		// 	name={this.state.persons[1].name}
		// 	age={this.state.persons[1].age}
		// 	click={this.switchNameHandler.bind(this, 'Max!')}
		// 	changed={this.nameChangedHandler}
		// >My Hobbies: Racing</Person>
		// <Person
		// 	name={this.state.persons[2].name}
		// 	age={this.state.persons[2].age}
		// />
	}
}

export default App;
