import React from 'react';
import { Pane, Tab, Tablist } from 'evergreen-ui';
import BannerDeposit from '../elements/BannerDeposit';
import DepositForm from '../elements/Deposit';
import { DEPOSITO, RETIRADA } from '../utils/constants';
import WithdrawalForm from '../elements/WithdrawalForm';
import '../css/menu.css';

function TransferView() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [tabs] = React.useState([DEPOSITO, RETIRADA]);

  return (
    <Pane display="flex" flexDirection="column" height="100vh">
      <BannerDeposit />
      <Pane className="games-container" flex={1}>
        <Tablist padding={8} flexBasis={240} className="tab-game-menu">
          {tabs.map((tab, index) => (
            <Tab
              key={tab}
              id={tab}
              onSelect={() => setSelectedIndex(index)}
              isSelected={index === selectedIndex}
              aria-controls={`panel-${tab}`}
              appearance="minimal"
              className={`tab-menu ${selectedIndex === index ? `active` : ''}`}
            >
              {tab}
            </Tab>
          ))}
        </Tablist>
        <Pane paddingBottom={32} paddingTop={32}>
          {tabs.map((tab, index) => (
            <Pane
              key={tab}
              id={`panel-${tab}`}
              role="tabpanel"
              aria-labelledby={tab}
              aria-hidden={index !== selectedIndex}
              display={index === selectedIndex ? 'block' : 'none'}
            >
              {tab === DEPOSITO ? <DepositForm /> : <WithdrawalForm />}
            </Pane>
          ))}
        </Pane>
      </Pane>
    </Pane>
  );
}

export default TransferView;
