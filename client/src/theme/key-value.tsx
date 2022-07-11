import { createUseStyles } from "react-jss";
export const useStyles = createUseStyles({
  
  keyValueDark: { 
    '&.value': {
      '& span':{
        textAlign:'center',
        backgroundColor: '#000',
        color: '#eee',
        fontWeight: 'bold',
        borderRadius: '10px',
      },
    },
    '&.icon': {
      '& span':{
        fontSize:'24px',
        padding: '4px 2px 2px 2px!important',
      },
    },
    "&.rs-uploader-trigger-btn":{
      padding: '12px 10px 10px 10px!important',
    },
    '&.text-right':{
      '& span': {
        textAlign:'right!important',
      }
    },
    '&.uploader':{
      color: '#fff',
    },
    fontSize: '16px',
    padding: '3px',
    fontWeight: '600',
    '& span': {
      padding: '12px 10px 10px 10px!important',
      width: '100%',
      display: 'block'
    },

    '@media (max-width: 768px)': {
      fontSize: '12px',
      padding: '3px',
      fontWeight: '600',      
      '& span': {
        padding: '8px 7px 7px 7px',
      },
    },
  },

// cart
  card: {
    '-webkit-box-shadow': '0 0 var(--card-border-shadow-offset) 0 var(--card-box-shadow)',
    '-webkit-box-orient': 'vertical',
    '-webkit-box-direction': 'normal',
    '-ms-flex-direction': 'column',
    backgroundClip: 'border-box',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '0',
    wordWrap: 'break-word',
    backgroundColor: 'var(--card-bg)',
    border: 'var(--card-border-width) solid var(--card-border-color)',
    borderRadius: 'var(--card-border-radius)',
    boxShadow: '0 0 var(--card-border-shadow-offset) 0 var(--card-box-shadow)',
    marginBottom: '24px',
  },

  card_body: {
    '-webkit-box-flex': '1',
    '-ms-flex': '1 1 auto',
    flex: '1 1 auto',
    padding: '1.5rem 1.5rem',
      
    '@media (max-width: 768px)': {
      padding: '1rem 1rem'
    }
  },


  abs_center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  square: {
    height: '0',
    width: '100%',
    paddingBottom: '100%',
  },

  flex_center: {
    display:'flex',
    alignItems:'center',
    justifyContent: 'center',
    width: '100%',
    height:'100%'
  },
  
});