import { createStyles } from '@mantine/core';

const useStyles = createStyles(() => ({
    header: {
        padding: '0px',
    },
    close: {
        marginTop: '10px',
        marginRight: '15px',
    },
    label: {
        marginBottom: '5px',
        color: '##252F4A',
        fontWeight: 500,
		fontSize:14
    },
	input	:{
		borderColor:'#F9F9F9',
		color:'#4B5675',
		backgroundColor:'#F9F9F9',
		fontWeight:500,

		'&::placeholder': {
			color:'#99A1B7',
			fontWeight:500
		  },
		  '&:focus': {
			background:'#F1F1F2',
			borderColor:'#F1F1F2'
		  },
	},
	
    content: {
        height: '700px',
		//display:'flex',
		//justifyContent:'center',
		//alignItems:'center'
    },
	
}));

const LEAVE_DURATION = [
    {
        label: 'Full',
        value: 'Full',
    },
    {
        label: 'First Half',
        value: 'First Half',
    },
    {
        label: 'Second Half',
        value: 'Second Half',
    },
];
const LEAVE_TYPE = [
    {
        label: 'Paid',
        value: 'Paid',
    },
    {
        label: 'Vacational',
        value: 'Vacational',
    },
];

export { useStyles, LEAVE_DURATION, LEAVE_TYPE };
