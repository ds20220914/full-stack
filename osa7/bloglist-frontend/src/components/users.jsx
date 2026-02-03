import { Link } from 'react-router-dom'
import {
  Table,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
} from '@mui/material'

const Users = ({ users, blogs }) => {
    const countBlogs =(username)=>{
        console.log("eka",username)
        console.log("toka",blogs[0].user[0].username)
        return blogs.filter((blog)=>blog.user[0].username===username).length
        
        
    }
  return (
    <div>
      <h1>Users</h1>
      <TableContainer sx={{ maxHeight: '500px' }}>
        <Table>
          <TableHead
            sx={{ position: 'sticky', top: 0, backgroundColor: '#f5f5f5' }}
          >
            <TableRow>
              <TableCell>
                <h2>Username</h2>
              </TableCell>
              <TableCell>
                <h2>Blogs created</h2>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <h2>
                    {user.username}
                  </h2>
                </TableCell>
                <TableCell>
                  <h2>{countBlogs(user.username)}</h2>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default Users