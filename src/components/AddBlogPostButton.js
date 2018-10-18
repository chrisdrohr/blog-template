// import React, {Component} from 'react';
// import {storage, database, timestamp} from "../Firebase";
// import {connect} from 'react-redux';
// import * as actions from '../actions';
// import {
//     Button
// } from  'material-ui/Button';
// import AppBar from 'material-ui/AppBar';
// import Dialog, {DialogTitle, DialogContentText, DialogContent, DialogActions, withMobileDialog} from 'material-ui/Dialog';
// import {CircularProgress} from 'material-ui/Progress';
// import {CardMedia} from 'material-ui/Card';
// import AddIcon from 'material-ui-icons/Add';
// import {AddAPhoto} from 'material-ui-icons';
// import CloseIcon from 'material-ui-icons/Close';
// import Divider from 'material-ui/Divider';
// import TextField from 'material-ui/TextField';
// import IconButton from 'material-ui/IconButton';
// import BlogCard from '../customComponents/BlogCard';
// import ButtonCR from '../customComponents/ButtonCR';
// import Grid from 'material-ui/Grid';
// import {white} from "../Colors";
// import './AddBlogPostButton.css';
//
// const ResponsiveDialog = withMobileDialog({breakpoint: 'sm'})(Dialog);
//
// class AddBlogPostButton extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             open: false,
//             progress: 0,
//             isUploading: false,
//             photoURL: null,
//             title: '',
//             body: '',
//             featured: false,
//             category: '',
//             timestamp: database.ServerValue.TIMESTAMP,
//         }
//     }
//
//     componentWillMount() {
//         this.storageRef = storage().ref();
//         const {fetchDraftPosts} = this.props;
//         fetchDraftPosts();
//     }
//     startUpload = () => {
//         let file = document.getElementById('file').files[0];
//         let uploadTask = this.storageRef.child('images/'+ file.name).put(file);
//
//         uploadTask.on('state_changed', (snapshot) => {
//             this.handleUploadStart();
//             let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             this.handleProgress(progress);
//             console.log('Upload is ' + progress + '% done');
//             switch (snapshot.state) {
//                 case storage.TaskState.PAUSED: // or 'paused'
//                     console.log('Upload is paused');
//                     break;
//                 case storage.TaskState.RUNNING: // or 'running'
//                     console.log('Upload is running');
//                     break;
//             }
//         }, (error) => {
//             console.log(error);
//             this.setState({isUploading: false});
//         }, () => {
//             let downloadUrl = uploadTask.snapshot.downloadURL;
//             console.log('Upload Complete', downloadUrl, file);
//             this.setState({avatar: file.name, progress: 100, isUploading: false});
//             this.setState({
//                 photoURL: downloadUrl,
//                 filename: file.name,
//             })
//         })
//     };
//     handleUploadStart = () => this.setState({isUploading: true, progress: 0});
//     handleProgress = (progress) => this.setState({progress});
//     openDraft(post) {
//         this.setState({
//             title: post.title,
//             body: post.body,
//             featured: post.featured,
//             category: post.category,
//             photoURL: post.photoURL,
//         })
//     }
//     getDraftPosts() {
//         const {draftPosts} = this.props;
//         if (draftPosts.fetched) {
//             const draftPostsList = Object.values(draftPosts.data).map((post, i) => {
//                 return (
//                     <Grid key={i} item lg={6} md={6} sm={6} xs={6}>
//                         <BlogCard
//                             draft={true}
//                             post={post}
//                             postOnClick={event => this.openDraft(post)}/>
//                     </Grid>
//                 )
//             });
//             return (
//                 <Grid className={'addBlogPostButton-draftPostsGrid'} container spacing={24}>
//                     {draftPostsList}
//                 </Grid>
//             )
//         } else {
//             return null;
//         }
//     }
//     getImage() {
//         const {progress, photoURL, isUploading} = this.state;
//         return (
//             <CardMedia image={photoURL !== null ? photoURL : ''} className={'addBlogPostButton-image'}>
//                 {!photoURL &&
//                     <div>
//                         <input accept="jpg,jpeg,JPG,JPEG" className={'addBlogPostButton-input'} onChange={this.startUpload} id="file"
//                                type="file"/>
//                         <label htmlFor="file">
//                             <IconButton component={'span'} className={'addBlogPostButton-imageButton'}>
//                                 <AddAPhoto className={'addBlogPostButton-imageIcon'}/>
//                             </IconButton>
//                         </label>
//                     </div>
//                 }
//                 {isUploading && <CircularProgress size={80} className={'addBlogPostButton-progress'} value={progress}/>}
//             </CardMedia>
//         )
//     }
//     getTitle() {
//         const {title} = this.state;
//         return (
//             <TextField
//                 onChange={event => this.setState({title: event.target.value})}
//                 value={title}
//                 label={'Title'}
//                 fullWidth
//                 margin="normal"/>
//         )
//     }
//     getBody() {
//         const {body} = this.state;
//         return (
//             <TextField
//                 onChange={event => this.setState({body: event.target.value})}
//                 value={body}
//                 label={'Body'}
//                 multiline
//                 fullWidth
//                 margin="normal"/>
//         )
//     }
//     createPost = () => {
//         const {title, body, featured, category, photoURL, timestamp} = this.state;
//         const {createPost} = this.props;
//         createPost({title, body, featured, category, photoURL, timestamp}).then(() => {
//             console.log('Post saved successfully');
//         })
//     };
//     saveDraft = () => {
//         const {saveDraft} = this.props;
//         const {title, body, featured, category, photoURL} = this.state;
//         saveDraft({title, body, featured, category, photoURL}).then(() => {
//             console.log('Draft saved successfully');
//         })
//     };
//     render() {
//         const {blogDialog, closeBlogDialog} = this.props;
//         const actions = [
//             <Button
//                 key={'saveDraft'}
//                 color={'primary'}
//                 onClick={this.saveDraft}>
//                 Save Draft
//             </Button>,
//             <Button
//                 key={'post'}
//                 color={'secondary'}
//                 onClick={this.createPost}>
//                 Post
//             </Button>
//         ];
//         return (
//             <div>
//                 <ResponsiveDialog
//                     open={blogDialog}>
//                     <AppBar position={'static'} color={'primary'}>
//                         <IconButton onClick={closeBlogDialog}>
//                             <CloseIcon color={'action'}/>
//                         </IconButton>
//                     </AppBar>
//                     <DialogTitle>
//                         {this.getImage()}
//                         {this.getTitle()}
//                     </DialogTitle>
//                     <DialogContent>
//                         <DialogContentText>
//                             {this.getBody()}
//                         </DialogContentText>
//                     </DialogContent>
//                     <DialogActions>
//                         {this.getDraftPosts()}
//                     </DialogActions>
//                     <Divider/>
//                     <DialogActions>
//                         {actions}
//                     </DialogActions>
//                 </ResponsiveDialog>
//             </div>
//         )
//     }
// }
//
// function mapStateToProps(state) {
//     return {
//         draftPosts: state.draftPosts,
//         blogDialog: state.blogDialog,
//     }
// }
// export default (connect(mapStateToProps,actions)(AddBlogPostButton))