import React, { Component } from 'react';
import { Card, Icon, Image, Popup } from 'semantic-ui-react';

//import CheckList from './CheckList.js';
import event from '../assets/event-2.json';
import './Event2.css';

class Event2 extends Component {
	render() {
		const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		
		const {title, sponsor, start, end, description, location, RSVP_link} = event;
		const startDate = new Date(start.year, start.month, start.day);
		const endDate = new Date(end.year, end.month, end.day);

		let period;
		if (startDate.getTime() === endDate.getTime()) {
			period = `${weekday[startDate.getDay()]}, ${monthNames[startDate.getMonth()]} ${startDate.getDate()}, ${startDate.getFullYear()}`;
		} else {
			period = [`${startDate.getDate()} ${monthNames[startDate.getMonth()]}, ${startDate.getFullYear()}`,
			`${endDate.getDate()} ${monthNames[endDate.getMonth()]}, ${endDate.getFullYear()}`].join(' - ');
		}
		
		const startAMPM = (start.hour / 12) < 1? 'AM': 'PM';
		const endAMPM = (end.hour / 12) < 1? 'AM': 'PM';
		const duration = [`${start.hour % 12} ${startAMPM}`,`${end.hour % 12} ${endAMPM}`].join(' - ');

		startDate.setHours(start.hour);
		startDate.setMinutes(start.minute);
		const elapsed = startDate.getTime() - Date.now();
		const seconds = elapsed / 1000;
		const minutes = seconds / 60;
		const hours = minutes / 60;
		const days = hours / 24;
		const weeks = days / 7;

		const helper = (time, name, modulo) => Math.floor(time) % modulo === 0? '' : `${Math.floor(time) % modulo} ${name}${Math.floor(time) % modulo > 1? 's':''}`;
		let timeLeft;
		if (elapsed > 0) {
			timeLeft = `${helper(weeks, 'week', weeks + 1)} ${helper(days, 'day', 7)} ${helper(hours, 'hour', 24)} ${helper(minutes, 'minute', 60)} ${helper(seconds, 'second', 60)}`.trim();
		} else {
			timeLeft = 'happened in the past!'
			clearInterval(this.forceUpdateInterval);
		}

		return (
			<Card id="event">
				{sponsor && <Image src={`./assets/logo/${sponsor}.png`} id={sponsor}/>}
				<Card.Content textAlign='left'>
					<Card.Header>{title}</Card.Header>
					<Card.Meta>
						<span>{period}</span>
						<br/>
						<span>{duration}</span>
						<br/>
						{
							location.length > 8 && 
							<Popup key='event2' position='left center' inverted trigger={<a href={"https://google.com/maps/search/" + location} target="_blank">{location}</a>} 
							header='Open Google Maps' content={location}/>
						}
						{	
							location.length <= 8 && 
							<Popup key='event2' position='left center' inverted trigger={<a href={"https://www.asu.edu/map/interactive/?psCode=" + location.substring(0, 4)} target="_blank">{location}</a>} 
							header='Open ASU Map' content={location}/>
						}
					</Card.Meta>
					<Card.Description>{description}</Card.Description>
				</Card.Content>
				<Card.Content extra textAlign='left'>
					<Icon name='time'/> {timeLeft}
					<br/>
					{RSVP_link && <a href={RSVP_link} target="_blank"><Icon name='mail'/> RSVP</a>}
					
				</Card.Content>
				{/* <Card.Content extra textAlign='left'>
					<Modal basic style={{maxWidth: '600px'}}
						trigger={<a>New to SoDA?</a>}
						content={<CheckList/>}/>
				</Card.Content> */}
			</Card>
		);
	}

	componentDidMount() {
		this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
	}

	componentWillUnmount() {
		clearInterval(this.forceUpdateInterval);
	}
}

export default Event2;