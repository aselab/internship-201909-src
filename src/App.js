import * as React from 'react';
import { Text, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import StickyNote from './StickyNote';
import uuidv4 from 'uuid/v4'
import moment from 'moment';
import { Button } from 'react-native-elements';

export default class App extends React.Component {
  state = {
    StickyNoteList: [],
  };
  
   addStickyNote = () => {
    const stickyNoteList = this.state.StickyNoteList;
    const uuid = uuidv4();
    stickyNoteList.push({
      component: <StickyNote key={uuid} uuid={uuid} setLimitDateTime={this.setLimitDateTime} deleteStickyNote={this.deleteStickyNote} />,
      limitDateTime: moment()
    });
    this.setState({ StickyNoteList: stickyNoteList });
  };

  setLimitDateTime = (dateTime, uuid) => {
    const stickyNoteList = this.state.StickyNoteList
    const newList = stickyNoteList.map(note => {
      if(note.component.key === uuid) {
        note.limitDateTime = dateTime;
      }
      return note;
    });
    this.setState({ StickyNoteList: newList });
  }

  deleteStickyNote = uuid => {
    const stickyNoteList = this.state.StickyNoteList;
    const newList = stickyNoteList.filter(note => note.component.key != uuid);
    this.setState({ StickyNoteList: newList });
  }

  sortStickyNote = () =>{
    const sortedList = this.state.StickyNoteList.sort((a, b) => {
      if (a.limitDateTime < b.limitDateTime) return -1;
      if (a.limitDateTime > b.limitDateTime) return 1;
      return 0;
    })
    this.setState({
      StickyNoteList: sortedList,
    });

  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {this.state.StickyNoteList.map(note => note.component)}        
        </ScrollView>
        <Button
          title="＋"
          onPress={this.addStickyNote}
          buttonStyle={styles.addButton}
        />
        <Button
          title="sort"
          onPress={this.sortStickyNote}
          buttonStyle={styles.sortButton}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  scrollContainer: {
    marginTop: 10,
    paddingBottom: 20
  },
  addButton: {
    width: 50,
    height: 50,
    left: 20,
    bottom: 20,
    position: 'absolute',
    borderRadius: 50
  },
  sortButton:{

  }
});
