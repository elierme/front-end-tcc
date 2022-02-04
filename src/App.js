import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppConfig } from './AppConfig';

import { Dashboard } from './components/Dashboard';
import { TableAssociados } from './components/TableAssociados';
import { TableAgendamentos } from './components/TableAgendamentos';
import { TableAtendimentos } from './components/TableAtendimentos';
import { TablePrestadores } from './components/TablePrestadores';
import { TableConveniados } from './components/TableConveniados';
import { RelatorioFinanceiro } from './components/RelatorioFinanceiro';

import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import './App.scss';

import {Amplify, Auth, I18n} from "aws-amplify";

import {AmplifyAuthenticator, AmplifySignIn} from '@aws-amplify/ui-react';

const AMPLIFY_CONFIG = {
    Auth: {
      "region": "us-west-2",
      "userPoolId": "us-west-2_LpIIDHnmd",
      "userPoolWebClientId": "43o7n9uedn6nttmem68qe1iaf9",
    },
    API: {
        endpoints: [
            {
                name: "api",
                endpoint: "https://t5xkeey356.execute-api.us-west-2.amazonaws.com/homo",
                custom_header: async () => {
                  // With Cognito User Pools use this:
                  return { Authorization: (await Auth.currentSession()).idToken.jwtToken }
                }
            }
        ]
    }
  };


  

Amplify.configure(AMPLIFY_CONFIG);

const dict = {
    en: {
        'Sign in to your account': "Entre com a sua conta",
        'Username *': "Usuário *",
        'Password *': "Senha *",
        'Sign In': "Acessar",
        'Forgot your password?': "Resgatar a sua Senha?",
        'Reset password': "Resetar senha",
        'Enter your username': "Entre com seu usuário",
        'Enter your password': "Entre com sua senha",
        'Reset your password': "Redefina sua senha",
        'Back to Sign In': "Voltar para acessar",
        'Send Code': "Enviar Código",
    }
};

I18n.setLanguage('en');
I18n.putVocabularies(dict);

const App = () => {

    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('light')
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;


    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value)
    }

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode)
    }

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        }
        else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }

    async function signOut() {
        try {
            await Auth.signOut();
            window.location.reload();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    const onMobileSubTopbarMenuClick = (event) => {
        signOut();
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const menu = [
        {
            label: 'Home',
            items: [{
                label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/'
            }]
        },
        {
            label: 'Cadastros', icon: 'pi pi-fw pi-sitemap',
            items: [
                { label: 'Associados', icon: 'pi pi-fw pi-search', to: '/associados' },
                { label: 'Conveniados', icon: 'pi pi-fw pi-search', to: '/conveniados' },
                { label: 'Prestadores', icon: 'pi pi-fw pi-search', to: '/prestadores' }
            ]
        },
        {
            label: 'Serviços ao Associado',
            items: [
                { label: 'Agendamentos',  icon: 'pi pi-fw pi-search', to: '/agendamentos',},
                { label: 'Atendimentos',  icon: 'pi pi-fw pi-search', to: '/atendimentos' }
            ]
        },
        {
            label: 'Relatórios',
            items: [
                { label: 'Financeiro',  icon: 'pi pi-fw pi-search', to: '/RelatorioFinanceiro',},
            ]
        },
        {
            label: 'Ciência de Dados', icon: 'pi pi-fw pi-clone',
            items: [
                { label: 'Big data', icon: 'pi pi-fw pi-user-edit', to: '/' },
            ]
        }
    ];

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light'
    });

    return (

        <AmplifyAuthenticator>

        <div className={wrapperClass} onClick={onWrapperClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

            <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    <Route path="/" exact render={() => <Dashboard colorMode={layoutColorMode} />} />
                    <Route path="/associados" component={TableAssociados} />
                    <Route path="/agendamentos" component={TableAgendamentos} />
                    <Route path="/atendimentos" component={TableAtendimentos} />
                    <Route path="/conveniados" component={TableConveniados} />
                    <Route path="/prestadores" component={TablePrestadores} />
                    <Route path="/RelatorioFinanceiro" component={RelatorioFinanceiro} />                    
                </div>

                <AppFooter layoutColorMode={layoutColorMode} />
            </div>

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>

        </div>

        <AmplifySignIn slot="sign-in" hideSignUp ></AmplifySignIn>
        </AmplifyAuthenticator>
    );

}

export default App
