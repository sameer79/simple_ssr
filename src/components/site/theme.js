import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	/*typography: {
		subtitle1: {
			fontWeight: '300'
		},
		fontWeight: '400',
		fontFamily: 'Heebo,' +
			'Arial,sans-serif'
	},*/
	palette: {
		// type: 'light',
		primary: {
			light: '#0A84F7',
			main: '#0A84F7',
			dark: '#4a65f5',
			contrastText: '#fff'
		}
	},
	overrides: {
		MuiSvgIcon: {
			colorPrimary: {
				color: '#0A84F7 !important'
			}
		},
		MuiButton: {
			containedPrimary: {
				backgroundColor: '#0A84F7 !important',
				// fontFamily: 'Heebo,Arial,sans-serif !important'
			},
			textPrimary: {
				color: '#0A84F7 !important',
				// fontFamily: 'Heebo,Arial,sans-serif !important'
			},
			containedSecondary: {
				backgroundColor: '#FC5439 !important',
				// fontFamily: 'Heebo,Arial,sans-serif !important'
			},
			textSecondary: {
				color: '#FC5439 !important',
				// fontFamily: 'Heebo,Arial,sans-serif !important'
			},
			contained: {
				'&.Mui-disabled': {
					color: 'rgba(0, 0, 0, 0.26) !important',
					boxShadow: 'none !important',
					backgroundColor: 'rgba(0, 0, 0, 0.12)!important',
					cursor: 'not-allowed'
					// fontFamily: 'Heebo,Arial,sans-serif !important'
				}
			},
			root: {
				// fontFamily: 'Heebo,Arial,sans-serif !important'
			},
			label: {
				whiteSpace: 'nowrap'
			}
		},
		/*MuiFilledInput: {
			input: {
				paddingTop: '7px !important',
				paddingBottom: '8px !important',
				'&.Mui-disabled': {
					cursor: 'not-allowed'
				}
			}
		},*/
		MuiFilledInput: {
			inputMultiline: {
				padding: '27px 12px 10px'
			},
			root: {
				backgroundColor: 'rgba(0,0,0,0.04)',
				'&:hover': {
					backgroundColor: 'rgba(0,0,0,0.08)'
				}
			}
		},
		MuiOutlinedInput: {
			root: {
				borderRadius: 0,
				'&.Mui-disabled': {
					background: '#f1f1f1',
					opacity: '0.8',
					color: 'rgba(0, 0, 0, 0.78)',
					cursor: 'not-allowed'
				},
				backgroundColor: '#fff !important'
			},
			input: {
				paddingTop: '8px !important',
				paddingBottom: '8px !important',
				'&.Mui-disabled': {
					cursor: 'not-allowed'
				},
				backgroundColor: '#fff !important'
			},
			multiline:{
				padding: '14px'
			}
		},
		MuiFormLabel: {
			root: {
				color: 'rgba(0, 0, 0, 0.87)',
				fontSize: '14px'
			},
			asterisk: {
				color: '#FC5439'
			}
		},
		MuiInputBase: {
			root: {
				paddingTop: '1px !important',
				paddingBottom: '0px !important'
			},
			input: {
				background: 'none !important',
				color: '#555 !important',
				fontSize: '14px'
			}
		},
		MuiTableCell: {
			head: {
				lineHeight: 'normal'
			}
		},
		MuiFormControlLabel: {
			label: {
				fontSize: '14px'
			},
			root: {
				marginRight: '4px'
			}
		},
		MuiChip: {
			label: {
				fontSize: '12px'
			}
		},
		MuiAutocomplete: {
			paper: {
				fontSize: '14px'
			},
			inputRoot: {
				paddingTop: '0 !important',
				paddingBottom: '0 !important'
			},
			tag: {
				fontSize: '14px'
			}
		},
		MuiMenuItem: {
			root: {
				fontSize: '14px'
			}
		},
		MuiFormHelperText:{
			contained:{
				marginLeft: '0px'
			}
		},
		MuiSwitch: {
			track:{
				borderRadius: '8px'
			},
			switchBase: {
				top: '-1px'
			}
		},
		MuiListItemSecondaryAction: {
			root: {
				display: 'flex'
			}
		},
		MuiCardContent: {
			root: {
				paddingBottom: '16px !important'
			}
		},
		MuiTableHead: {
			root: {
				backgroundColor: '#F5F5F6'
			}
		}
	}/*,
	custom: {
		border: {
			onePX: '1px solid rgba(0, 0, 0, .125)'
		},
		background: {
			background: '#192633',
			background1: '#F2F2F2',
			background2: '#EEEEEE',
			background3: '#fafafa',
			background4: '#498ee65e',
			background5: 'linear-gradient(0deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12)), #FAFAFA',
			background6: 'rgba(255, 255, 255, 0.5)'
		},
		sideMenuBarDrawer: {
			collapsedWidth: '0px',
			expandedWidth: '280px'
		},
		status: {
			active: '#44b700',
			inactive: '#f44336',
			failed: '#f44336',
			completed: '#48CA1A',
			incomplete: 'rgba(117, 117, 117, 0.5)',
			error: 'Red'
		}
	}*/
});

export default theme;
