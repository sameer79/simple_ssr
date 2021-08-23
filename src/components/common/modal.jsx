import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return (
        <Slide
            direction="down"
            ref={ref}
            className="custom-dialog"
            unmountOnExit
            in
            timeout={2000}
            {...props}
        />
    );
});

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6" style={{ maxWidth: '90%' }}>{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const defaultState = {
    show: false,
    title: '',
    btnOkText: '',
    btnCancelText: '',
    // btnSaveAsText: '',
    showOkButton: true,
    showCloseButton: true,
    btnOkDisabled: false,
    // showSaveAs: false
}

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = defaultState
    }
    show(state) {
        var state = state || {}
        state.show = true;
        state.btnOkDisabled = false;
        this.setState(state);
    }
    sure = saveAs => {
        let resolve = this.props.dataResolve;
        if (resolve) {
            resolve(saveAs);
        }
    }
    cancel = () => {
        let { reject } = this.props;
        if (reject) {
            reject()
        } else {
            this.hide()
        }
    }
    hide = () => {
        this.setState({ show: false });
    }
    showOkButton(showOkButton = this.state.showOkButton) {
        this.setState({
            showOkButton
        })
    }
    okBtnDisabled(status) {
        this.setState({ btnOkDisabled: status })
    }
    showHideOkButton(status) {
        this.setState({ showOkButton: status })
    }
    showHideCloseButton(status) {
        this.setState({ showCloseButton: status })
    }
    setOkButtonTxt(txt) {
        this.setState({ btnOkText: txt });
    }
    header() {
        return (
            <DialogTitle id="customized-dialog-title" onClose={this.cancel}>
                {this.props["dataTitle"] || this.state.title}
            </DialogTitle>
        );
    }
    body() {
        const { opts } = this.props;
        const noModalClass = opts.footer.self ? '' : 'no-modal-footer';
        let children = this.props.children;
        if (typeof this.props.children == 'function') {
            children = this.props.children();
        }

        return (<DialogContent dividers className={`${noModalClass}`}>{children}</DialogContent>);
    }
    footer() {
        const { showCloseButton } = this.state;
        return (
            <DialogActions>
                {this.props.customFooterButtons && this.props.buttonComponent(this.state.btnOkDisabled)}
                {showCloseButton &&
                    <Button data-test="modal-cancel-btn" color='primary' className='modal-close--btn' onClick={this.cancel}>
                        {this.state.btnCancelText || 'Close'}
                    </Button>
                }
                {this.state.showOkButton &&
                    <Button data-test="modal-ok-btn" variant="contained" color='primary' className='modal-save--btn' onClick={this.sure} disabled={this.state.btnOkDisabled}>
                        {this.state.btnOkText || 'Save'}
                    </Button>
                }
            </DialogActions>
        );
    }
    render() {
        const { opts, dataTitle, dataResolve, reject, animation = Grow, customFooterButtons, buttonComponent, scrollable = false, fullWidth = true, onEnter, ...rest } = this.props;
        if (!rest.maxWidth) {
            rest.maxWidth = 'sm';
        }
        return (
            <Fragment>
                <Dialog aria-labelledby="customized-dialog-title"
                    open={this.state.show}
                    onClose={this.cancel}
                    onEnter={onEnter && onEnter()}
                    disableBackdropClick={true}
                    disableEscapeKeyDown={true}
                    fullWidth={fullWidth}
                    TransitionComponent={Transition}
                    scroll={scrollable ? 'body' : 'paper'}
                    {...rest}
                >
                    {this.header()}
                    {this.body()}
                    {opts.footer.self ? this.footer() : null}
                </Dialog>
            </Fragment>
        );
    }
}

Modal.defaultProps = {
    opts: {
        header: {
            self: true
        },
        body: {
            self: true
        },
        footer: {
            self: true
        }
    }
}

var _resolve;
var _reject;

class Confirm extends Modal {
    show(state) {
        var state = state || {}
        state.show = true;
        if (!state.hasOwnProperty('showOkButton')) {
            state.showOkButton = defaultState.showOkButton;
        }
        if (!state.hasOwnProperty('btnOkText')) {
            state.btnOkText = defaultState.btnOkText;
        }
        if (!state.hasOwnProperty('btnCancelText')) {
            state.btnCancelText = defaultState.btnCancelText;
        }
        if (!state.hasOwnProperty('btnOkDisabled')) {
            state.btnOkDisabled = false;
        }
        this.setState(state);
        let promise = new Promise(function (resolve, reject) {
            _resolve = resolve;
            _reject = reject;
        })
        return promise;
    }
    sure = () => {
        this.okBtnDisabled(true);
        _resolve(this);
    }
    cancel = () => {
        _reject(this);
        this.hide();
    }
    header() {
        return (
            <DialogTitle id="customized-dialog-title" onClose={this.cancel}>
                {this.state.title}
            </DialogTitle>
        );
    }
    body() {
        if (this.props.children) {
            const { opts } = this.props;
            const noModalClass = opts.footer.self ? '' : 'no-modal-footer';
            return (
                <DialogContent dividers className={`${noModalClass}`}>
                    {this.props.children}
                </DialogContent>
            );
        }
        return '';
    }
    footer() {
        return (
            <DialogActions>
                <Button data-test="confirm-no-btn" color="primary" onClick={this.cancel}>
                    {this.state.btnCancelText || 'No'}
                </Button>
                {this.state.showOkButton &&
                    <Button data-test="confirm-yes-btn" variant="contained" color="secondary" onClick={this.sure} disabled={this.state.btnOkDisabled}>
                        {this.state.btnOkText || 'Yes'}
                    </Button>
                }
            </DialogActions>
        );
    }
}

export default Modal;
export { Confirm };
