import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import {monthList, monthNameList} from "../constants/MyConstants";
import SelectCR from '../customComponents/SelectCR';
import './DateCR.css';

class DateCR extends Component {
    // getYear = () => {
    //     let d = new Date('01' + "January 2017");
    //     let first = d.getFullYear();
    //     let s = new Date('01' + "December 2030");
    //     let second = s.getFullYear();
    //     let arr = [];
    //     let i = 0;
    //     for(i = first; i <= second; i++) arr.push(i);
    //     this.setState({yearList: arr});
    // };
    // getDay = () => {
    //     const {year, month, dayNameList} = this.state;
    //     let date = new Date(year, month, 1);
    //     let arr = [];
    //     while (date.getMonth() === month) {
    //         arr.push(date.getDate()+' - '+dayNameList[date.getDay()]);
    //         date.setDate(date.getDate()+1);
    //     }
    //     return this.setState({dayList: arr, day: arr[0]});
    // };
    render() {
        const {onChangeFunction, yearList, dayList, year, month, day} = this.props;
        return (
            <div>
                <Grid container justify={'center'} spacing={8}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <SelectCR
                            id={'year'}
                            inputLabel={'Year'}
                            value={year}
                            onChangeFunction={onChangeFunction('year')}
                            list={yearList}/>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <SelectCR
                            id={'month'}
                            inputLabel={'Month'}
                            value={month}
                            onChangeFunction={onChangeFunction('month')}
                            list={monthList}
                            nameList={monthNameList}/>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <SelectCR
                            id={'day'}
                            inputLabel={'Day'}
                            value={day}
                            onChangeFunction={onChangeFunction('day')}
                            list={dayList}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default DateCR