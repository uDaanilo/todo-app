import React from 'react'
import IconButton from '../template/iconButton'
import todoForm from './todoForm'

export default props => {

   const renderRows = () => {
      const list = props.list || []
      return list.map(i => (
         <tr key={i._id}>
            <td className={i.done ? 'markedAsDone' : ''}>{i.description}</td>
            <td>
               <IconButton style="success" icon="check" onClick={() => props.handleMarkAsDone(i)} hide={i.done} />
               <IconButton style="warning" icon="undo" onClick={() => props.handleMarkAsPending(i)} hide={!i.done} />
               <IconButton style="danger" icon="trash-o" onClick={() => props.handleRemove(i)} hide={!i.done} />
            </td>
         </tr>
      ))
   }

   return (
      <table width="100%" className="table">
         <thead>
            <tr>
               <th>Descricao</th>
               <th className="tableActions">Acoes</th>
            </tr>
         </thead>
         <tbody>
            {renderRows()}
         </tbody>
      </table>
   )
}