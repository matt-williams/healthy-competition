function Settings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Settings</Text>}>
        <Text bold>Skin Color</Text>
        <ColorSelect
          settingsKey="skin"
          colors={[
            {color: 'white'},
            {color: 'pink'},
            {color: 'yellow'},
            {color: 'brown'},
            {color: 'black'}
          ]}
        />
        <Text bold>Hair Color</Text>
        <ColorSelect
          settingsKey="hair"
          colors={[
            {color: 'white'},
            {color: 'yellow'},
            {color: 'brown'},
            {color: 'black'}
          ]}
        />
        <Text bold>Shirt Color</Text>
        <ColorSelect
          settingsKey="shirt"
          colors={[
            {color: 'red'},
            {color: 'blue'},
            {color: 'yellow'},
            {color: 'green'},
            {color: 'white'},
            {color: 'black'}
          ]}
        />
        <Text bold>Shorts Color</Text>
        <ColorSelect
          settingsKey="shorts"
          colors={[
            {color: 'red'},
            {color: 'blue'},
            {color: 'yellow'},
            {color: 'green'},
            {color: 'white'},
            {color: 'black'}
          ]}
        />
        <Text bold>Socks Color</Text>
        <ColorSelect
          settingsKey="socks"
          colors={[
            {color: 'red'},
            {color: 'blue'},
            {color: 'yellow'},
            {color: 'green'},
            {color: 'white'},
            {color: 'black'}
          ]}
        />
        <Text bold>Shoes Color</Text>
        <ColorSelect
          settingsKey="shoes"
          colors={[
            {color: 'red'},
            {color: 'blue'},
            {color: 'yellow'},
            {color: 'green'},
            {color: 'white'},
            {color: 'black'}
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(Settings);