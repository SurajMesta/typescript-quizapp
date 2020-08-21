import styled from 'styled-components'

type ButtProps={
    correct:boolean,
    isClicked:boolean
}
export const ButtContainer=styled.div<ButtProps>`

button {
display:block;
background: ${({correct,isClicked})=>
correct?'linear-gradient(90deg, #56ffa4, #59bc86)':
       !correct && isClicked ? 'linear-gradient(90deg, #ff5f40, #c16868)':null
}
}

// 'linear-gradient(90deg, #56ccff, #6eafb4)'

`