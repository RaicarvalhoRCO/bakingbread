import { useCallback, useState } from 'react'
import { Button, Stack } from '@sanity/ui'
import { ObjectInputProps } from 'sanity'

export function IngredientGroupInput(props: ObjectInputProps) {
  const [saved, setSaved] = useState(false)

  const handleSave = useCallback(() => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }, [])

  return (
    <Stack space={4}>
      {props.renderDefault(props)}
      <Button
        tone={saved ? 'positive' : 'primary'}
        text={saved ? '✓ Salvo!' : 'Salvar seção'}
        onClick={handleSave}
        mode="default"
        style={{ alignSelf: 'flex-start' }}
      />
    </Stack>
  )
}
