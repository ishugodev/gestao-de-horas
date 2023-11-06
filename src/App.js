import styled from 'styled-components';
import logoImg from './assets/img/logo.png'
import { Fragment, useState } from 'react';


const SideBar = styled.div`
  width: 260px;
  height: 100%;
  background: #1E8976;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  `

const Content = styled.div`
  padding: 30px 30px 30px calc(260px + 30px);

  `

const Title = styled.div`
  padding: 0;
  margin: 0 0 15px 0;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: bold;
  `

const Line = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  
  div {
    position: relative;
  }
  
  input {
    width: 190px;
    background: #EEEEEE;
    border: 0;
    height: 45px;
    border-radius: 5px;
    padding: 0 10px;
    text-align: center;
    
    &[type=date] {
      width: 140px;
    }
  }
  
  label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 190px;
    background: #EEEEEE;
    border: 0;
    height: 45px;
    border-radius: 5px;
    padding: 0 10px;
    text-align: center;
    pointer-events: none;
    position: absolute;
    top: 0;
  }
  
  .horarios {
    display: flex;
    gap: 20px;
  }
  
  .horario:hover label {
    opacity: 0;
  }
  
  .addHorario {
    cursor: pointer;
  }
  
  `

const AddDia = styled.div`
    cursor: pointer;
    display: flex;
    font-size: 14px;
    margin-top: 20px;
    width: 60%;
    align-items: center;
    background: #EEEEEE;
    border: 0;
    height: 45px;
    border-radius: 5px;
    padding: 0 10px;
    `

const Days = styled.div`
    padding: 30px;
    min-height: 500px;
    background: #FFFFFF;
    border-radius: 5px;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.15);
    overflow: auto;
    
    `


const today = new Date().toISOString().slice(0, 10);
const defaultHour = {
  entrada: '00:00',
  saida: '00:00'
}

const defaultLine = {
  dia: today,
  horarios: [
    defaultHour,
    defaultHour
  ]
}

const defaultLines = [
  defaultLine
]

const App = () => {
  const [linhas, setLinhas] = useState(defaultLines)
  
  const ClicouParaAddLinha = () => {
    const novaLinhas = [
      ...linhas,
      defaultLine
    ]

    setLinhas(novaLinhas)
  }

  const ClicouParaAddHora = (index) => {
    const novaLinhas = linhas.map((linha, indexLinha) => {
      if (indexLinha === index) {
        return {
          ...linha,
          horarios: [
            ...linha.horarios,
            defaultHour
          ]
        }
      }

      return linha
    })

    setLinhas(novaLinhas)
  }

  const alterarDia = (valor, index) => {
    const novaLinhas = linhas.map((linha, indexLinha) => {
      if (indexLinha === index) {
        return{
          ...linha,
          dia: valor
        }
      }

      return linha
    })

    setLinhas(novaLinhas)
  }

  return (
    <>
      <SideBar>
        <img src={logoImg} alt="Logo do site Gestão de Horas" />
      </SideBar>
      <Content>
        <Title>
          Minhas horas
        </Title>
        <Days>
          {
            linhas.map((linha, indexLinha) => {
              return (
                <Line key={indexLinha}>
                  <div>
                    <input
                      type="date"
                      value={linha.dia}
                      onChange={(evento) => alterarDia(evento.target.value, indexLinha)}
                    />
                  </div>
                  <div>
                    :
                  </div>
      
                  {
                    linha.horarios.map((hora, indexHora) => {
                      return (
                        <Fragment key={indexHora}>
                          {indexHora !== 0 ? (
                            <div>
                              |
                            </div>

                          ) : false}  

                          <div className='horarios'>
                            <div className='horario'>
                              <label htmlFor={indexHora + 'entrada'}>
                                Entrada
                              </label>
                              <input type={indexHora + 'entrada'} defaultValue={hora.entrada} id={indexHora + 'entrada'} name={indexHora + 'entrada'} />
                            </div>
                            <div className='horario'>
                              <label htmlFor={indexHora + 'saida'}>
                                Saída
                              </label>
                              <input type={indexHora + 'saida'} defaultValue={hora.saida} id={indexHora + 'saida'} name={indexHora + 'saida'} />
                            </div>
                          </div>    
                        </Fragment>
                      )
                    })
                  }

                  <div
                    className="addHorario"
                    onClick={() => ClicouParaAddHora(indexLinha)}
                  >
                    +
                  </div>
      
                </Line>
                
              )
            })
          }

          <AddDia onClick={() => ClicouParaAddLinha()}>
            + Adiciona data
          </AddDia>
        </Days>
      </Content>
    </>
  );
}

export default App;
