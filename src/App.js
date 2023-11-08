import styled from 'styled-components';
import logoImg from './assets/img/logo.png'
import { Fragment, useEffect, useMemo, useState } from 'react';


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

    &.active {
      width: auto;
      height: auto;
      top: -10px;
      background: transparent;
    }
  }
  
  .horarios {
    display: flex;
    gap: 20px;
  }
  
  .horario:hover label:not(.active) {
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
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  overflow: auto;
  position: relative;
  padding-bottom: 105px; 
`

const ContagemFinal = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: space-around;
  align-items: center;
  background: #EEEEEE;
  box-shadow: 0 -4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  input {
    width: 190px;
    background: #FFFFFF;
    border: 0;
    height: 45px;
    border-radius: 5px;
    padding: 0 10px;
    text-align: center;
    
  }

  input::placeholder {
    color: #000000;
  }
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
  const [valorHora, setValorHora] = useState(100)

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
        return {
          ...linha,
          dia: valor
        }
      }

      return linha
    })

    setLinhas(novaLinhas)
  }

  const alterarHora = (valor, indexL, indexH, type) => {
    const novaLinhas = linhas.map((linha, indexLinha) => {
      if (indexL === indexLinha) {
        const horarios = linha.horarios.map((horario, indexHorario) => {
          if (indexHorario === indexH) {
            return {
              ...horario,
              [type]: valor
            }
          }

          return horario
        })

        return {
          ...linha,
          horarios: horarios
        }
      }

      return linha
    })

    setLinhas(novaLinhas)
  }

  const retornaQuantidadeMinutos = (horaioEntrada, horarioSaida) => {
    const entradaSeparada = horaioEntrada.split(':')
    const saidaSeparada = horarioSaida.split(':')

    const diferencaHora = saidaSeparada[0] - entradaSeparada[0]
    const diferencaMinutos = saidaSeparada[1] - entradaSeparada[1]

    const totalMinutos = diferencaHora * 60 + diferencaMinutos

    return totalMinutos
  }

  const quantidadeHorasMinutos = useMemo(() => {
    let qtdMinutos = 0

    linhas.forEach((linha) => {
      linha.horarios.forEach((horario) => {
          if (horario.entrada !== '00:00' && horario.saida !== '00:00') {
            const minutos = retornaQuantidadeMinutos(horario.entrada, horario.saida)

            qtdMinutos = qtdMinutos + minutos
            return qtdMinutos
          }
      })
    })

    const horaCalculada = qtdMinutos / 60

    const getNotDecimal = (numero) => {
      const notDecimalString = numero.toString().split('.')[0]
      return Number(notDecimalString)
    }

    const horas = getNotDecimal(horaCalculada)

    const renderizarMinutos = () => {
      const minutosRenderizados = Math.round((horaCalculada - horas)* 60)
      return minutosRenderizados
    }

    const minutos = renderizarMinutos()

    return (`${horas}h ${minutos}min`)
  }, [linhas])

  const quantidadeHoras = () => {
    let qtdMinutos = 0

    linhas.forEach((linha) => {
      linha.horarios.forEach((horario) => {
          if (horario.entrada !== '00:00' && horario.saida !== '00:00') {
            const minutos = retornaQuantidadeMinutos(horario.entrada, horario.saida)

            qtdMinutos = qtdMinutos + minutos
            return qtdMinutos
          }
      })
    })

    const horaCalculada = qtdMinutos / 60

    return horaCalculada
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
                              <label
                                htmlFor={indexHora + 'entrada'}
                                className={hora.entrada !== '00:00' ? 'active' : ''}
                              >
                                Entrada
                              </label>
                              <input
                                type="time"
                                defaultValue={hora.entrada}
                                id={indexHora + 'entrada'}
                                name={indexHora + 'entrada'}
                                onChange={(evento) => alterarHora(evento.target.value, indexLinha, indexHora, 'entrada')}
                              />
                            </div>

                            <div className='horario'>
                              <label
                                htmlFor={indexHora + 'saida'}
                                className={hora.saida !== '00:00' ? 'active' : ''}
                              >
                                Saída
                              </label>
                              <input
                                type="time"
                                defaultValue={hora.saida}
                                id={indexHora + 'saida'}
                                name={indexHora + 'saida'}
                                onChange={(evento) => alterarHora(evento.target.value, indexLinha, indexHora, 'saida')}
                              />
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
          <ContagemFinal>
            <div>
              Dias trabalhados: { linhas.length }
            </div>
            <div>
              Quantidade de horas: { quantidadeHorasMinutos }
            </div>
            <input placeholder='Valor da hora' />
            <div>
              Valores a receber: R$ { (quantidadeHoras() * valorHora).toFixed(2) }
            </div>
          </ContagemFinal>
        </Days>
      </Content>
    </>
  );
}

export default App;
