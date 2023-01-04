import { Container, Typography, Button, Paper, Avatar } from '@mui/material'

export default function CollaboratorItem({ collaborator, searchResults, setSearchResults, invited, setInvited }) {

  const stringToColor = (string) => {
    let hash = 0;

    for (let i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  const collabStyle = {
    padding: 1,
    marginY: 1,
    backgroundColor: 'grey.50',
    width: '50%'
  }

  // when a collaborator is clicked, move them: if they are remove that user from the 'searchResults array' and put them in the 'invited' array
  const handleClick = () => {
    console.log('clicked collaborator');
    if (searchResults.includes(collaborator)) {
      setInvited([...invited, collaborator]);
      setSearchResults([...searchResults].filter(result => result.id !== collaborator.id))
    }
    else {
      setSearchResults([...searchResults, collaborator]);
      setInvited([...invited].filter(result => result.id !== collaborator.id))
    }
  }

  return (
    <Container>
      <Paper sx={collabStyle} onClick={handleClick}>
        <Avatar></Avatar>
        <Typography variant='h6'>{collaborator.first_name} {collaborator.last_name}</Typography>
        <Typography variant='body2'>{collaborator.instrument_1 || 'musician'}</Typography>
      </Paper>
    </Container>
  )
}