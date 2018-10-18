import React, {Component} from 'react';
import ServicesCard from '../customComponents/ServicesCard';
import TierCard from '../customComponents/TierCard';
import Grid from 'material-ui/Grid';
import List,{ListSubheader} from 'material-ui/List';
import './Services.css'
import {AttachMoney} from 'material-ui-icons';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {services} from "../Constants";
import DialogCR from '../customComponents/DialogCR';

class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: services.buttons,
            tiers: services.tiers,
            selectedTier: null,
            selectedCategory: null,
            open: false,
        }
    }
    handleOpen = () => {
        this.setState({
            open: true,
        });
        this.handleSetBodyFixed()
    };
    handleClose = () => {
        this.setState({open: false});
        this.handleSetBodyUnfixed()
    };
    handleSetBodyFixed = () => {
        const body = document.body;
        body.style.position = 'absolute';
    };
    handleSetBodyUnfixed = () => {
        const body = document.body;
        body.style.position = null;
    };
    handleScroll = (value) => {
        const {services} = this.state;
        const postCollegeCareerHelp = document.getElementById('postCollegeCareerHelp');
        const jobInterviewPrep = document.getElementById('jobInterviewPrep');
        const contentCreation = document.getElementById('contentCreation');
        const socialMediaManagement = document.getElementById('socialMediaManagement');
        switch (value) {
            case services.postCollegeCareerHelp.title: postCollegeCareerHelp.scrollIntoView(); break;
            case services.jobInterviewPrep.title: jobInterviewPrep.scrollIntoView(); break;
            case services.contentCreation.title: contentCreation.scrollIntoView(); break;
            case services.socialMediaManagement.title: socialMediaManagement.scrollIntoView(); break;
        }
    };
    handleTierCardClick = (value, tier, category) => {
        this.setState({
            selectedTier: tier,
            selectedCategory: category,
        });
        // switch (value) {
        //     case 'resumeCoverLetterTier':
        //         switch (item.title) {
        //             case 'Tier 1': this.setState({selectedTier: item}); break;
        //             case 'Tier 2': this.setState({selectedTier: item}); break;
        //             case 'Tier 3': this.setState({selectedTier: item}); break;
        //         } break;
        //     case 'jobInterviewPrepTier':
        //         switch (item.title) {
        //             case 'Tier 1': this.setState({selectedTier: item}); break;
        //             case 'Tier 2': this.setState({selectedTier: item}); break;
        //             case 'Tier 3': this.setState({selectedTier: item}); break;
        //     } break;
        //     case 'contentCreationTier':
        //         switch (item.title) {
        //             case 'Tier 1': this.setState({selectedTier: item}); break;
        //             case 'Tier 2': this.setState({selectedTier: item}); break;
        //             case 'Tier 3': this.setState({selectedTier: item}); break;
        //         } break;
        //     case 'socialMediaManagementTier':
        //         switch (item.title) {
        //             case 'Tier 1': this.setState({selectedTier: item}); break;
        //             case 'Tier 2': this.setState({selectedTier: item}); break;
        //             case 'Tier 3': this.setState({selectedTier: item}); break;
        //         } break;
        // }
        this.handleOpen()
    };
    getServices() {
        const {services} = this.state;
        const servicesList = Object.values(services).map((item) => {
            return (
                <Grid key={item.title} item lg={6} md={6} sm={6} xs={12}>
                    <ServicesCard
                        handleClickFunction={() => this.handleScroll(item.title)}
                        image={item.image}
                        title={item.title}
                        button={item.button}/>
                </Grid>
            )
        });
        return (
            <Grid container spacing={24}>
                {servicesList}
            </Grid>
        )
    }
    getTiers(value) {
        const {tiers} = this.state;
        const tiersList = Object.values(tiers[value]).map((item) => {
            return (
                <Grid
                    key={value + item.title}
                    item
                    lg={4}
                    md={4}
                    sm={item.tier === 3 ? 12 : 6}
                    xs={12}>
                    <TierCard
                        onClickFunction={() => this.handleTierCardClick(value, item, item.category)}
                        id={value + item.title}
                        title={item.title}
                        price={item.price}
                        detail={item.detail}/>
                </Grid>
            )
        });
        return (
            <Grid container spacing={24}>
                {tiersList}
            </Grid>
        )
    }
    tiersLayout() {
        const {services} = this.state;
        return (
            <List className={'services-list'} subheader>
                <ListSubheader
                    className={'services-subheader'}
                    id={'postCollegeCareerHelp'}>
                    {services.postCollegeCareerHelp.title}
                    </ListSubheader>
                {this.getTiers('postCollegeCareerHelpTier')}
                {/*<ListSubheader className={'services-subheader'} id={'jobInterviewPrep'}>{services.jobInterviewPrep.title}</ListSubheader>*/}
                {/*{this.getTiers('jobInterviewPrepTier')}*/}
                {/*<ListSubheader className={'services-subheader'} id={'contentCreation'}>{services.contentCreation.title}</ListSubheader>*/}
                {/*{this.getTiers('contentCreationTier')}*/}
                <ListSubheader
                    className={'services-subheader'}
                    id={'socialMediaManagement'}>
                    {services.socialMediaManagement.title}
                    </ListSubheader>
                {this.getTiers('socialMediaManagementTier')}
            </List>
        )
    }
    getDialog() {
        const {open, selectedTier, selectedCategory} = this.state;
        if (selectedTier !== null) {
            return (
                <DialogCR
                    open={open}
                    title={selectedCategory +' $'+ selectedTier.price}
                    text={selectedTier.title}
                    content={ <TextField label={'Email'}/>}
                    actions={
                        <Button onClick={this.handleClose} color={'primary'}>
                            Close
                        </Button>
                    }/>
            )
        }
    }

    render() {
        return (
            <div>
                {this.getServices()}
                {this.tiersLayout()}
                {this.getDialog()}
            </div>
        )
    }
}
export default (Services)
