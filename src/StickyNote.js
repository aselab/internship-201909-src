import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import InputNumberStyles from 'rmc-input-number/lib/styles';
import InputNumber from 'rmc-input-number';

export default class StickyNote extends Component {
  state = {
    isDateTimePickerVisible: false,
    limitDateTime: moment(),
    value: 1
  };


  onChange = (value) => {
    console.log('onChange:', value);
    this.setState({ value });
  }

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  

  setDateTime = dateTime => {

    this.setState({
      limitDateTime: moment(dateTime)
    });
    this.props.setLimitDateTime(moment(dateTime), this.props.uuid);
  }

  get isWarning() {
    const now = moment();
    const limitDate = moment(this.state.limitDateTime);
    return limitDate.diff(now, 'hours') < 24;
  }

  render() {
    const cardStyle = this.isWarning ? styles.warningCard : styles.card;
    return (
      <Card
        containerStyle={cardStyle}
        title={
          <View>
            <TextInput
              placeholder="タイトルを入力"
              placeholderTextColor="#7c7c7c"
            />
          </View>
        }>
        <Button
          title="×"
          buttonStyle={styles.deleteButton}
          onPress={() => this.props.deleteStickyNote(this.props.uuid)}
        />
        <TextInput
          placeholder="内容を入力"
          placeholderTextColor="#7c7c7c"
          multiline
          style={styles.contentTextInput}
        />
        <View style={styles.datetimeContainer}>
          <Text>期限：</Text>
          <Text onPress={this.showDateTimePicker}>
            {this.state.limitDateTime.format('YYYY年MM月DD日 HH時mm分')}
          </Text>
        </View>
        <View style={styles.centering}>
        <Text>優先度 </Text>
        </View>
        <InputNumber
          min={1}
          max={5}
          styles={InputNumberStyles}
          onChange={this.onChange}
          value={this.state.value}
        />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          mode={'datetime'}
          onConfirm={dateTime => {
            this.setDateTime(dateTime);
            this.hideDateTimePicker();
          }}
          onCancel={this.hideDateTimePicker}
        />
      </Card>
    );
  }
}
 const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f99a',
  },
  warningCard: {
    backgroundColor: '#f5aa9a',
  },
  datetimeContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  deleteButton: {
    backgroundColor: '#EFD032',
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 30,
    width: 30,
    borderRadius: 30
  },
  centering: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
