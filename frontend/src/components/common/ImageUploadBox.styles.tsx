export const boxStyleBeforeUpload = {
    alignSelf: 'center',
    width: 200,
    height: 120,
    border: '2px solid #aaa',
    borderRadius: 2,
    backgroundColor: '#ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: '#f0f0f0',
    },
};

export const boxStyleAfterUpload = {
    alignSelf: 'center',
    width: 150,
    height: 30,
    border: '2px solid #aaa',
    borderRadius: 2,
    backgroundColor: '#ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: '#f0f0f0',
    },
};

export const modalStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)'
};

export const imageInModalStyle: React.CSSProperties = {
    objectFit: 'contain',
    maxWidth: '90vw',
    maxHeight: '80vh',
    objectPosition: 'center',
};

export const imageInFormStyle: React.CSSProperties = {
    boxShadow: '0 0 3px 3px rgb(205, 205, 205)',
    maxWidth: '250px',
};