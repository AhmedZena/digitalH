import type { Meta } from '@storybook/react'
import React from 'react'

import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
} from './dropdown'

const meta: Meta = {
  component: DropdownMenu,
}

export default meta

export const Default = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button data-test-id="Button-tru63">Open Menu</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>Item One</DropdownMenuItem>
      <DropdownMenuItem>Item Two</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Item Three</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

export const WithCheckboxItems = () => {
  const [checked, setChecked] = React.useState(true)
  const [checked2, setChecked2] = React.useState(false)

  return (
    (<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button data-test-id="Button-bwnm2">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem
          checked={checked}
          onCheckedChange={setChecked}
        >
          Option One
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={checked2}
          onCheckedChange={setChecked2}
        >
          Option Two
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>)
  );
}

export const WithRadioItems = () => {
  const [value, setValue] = React.useState('one')

  return (
    (<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button data-test-id="Button-0g31m">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Select an option</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
          <DropdownMenuRadioItem value="one">Option One</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="two">Option Two</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="three">
            Option Three
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>)
  );
}

export const WithSubmenus = () => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button data-test-id="Button-hykrc">Open Menu</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>Item One</DropdownMenuItem>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Sub Item One</DropdownMenuItem>
          <DropdownMenuItem>Sub Item Two</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuItem>Item Three</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)
