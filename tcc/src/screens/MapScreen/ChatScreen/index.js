import React from "react";
import { Platform, KeyboardAvoidingView, SafeAreaView, StyleSheet, Image } from "react-native";
import { GiftedChat, InputToolbar, Composer, Bubble, Avatar } from "react-native-gifted-chat";
import Fire from "../../Database/dbChat";

export default class ChatScreen extends React.Component {
  state = {
    messages: []
  };

  get user() {
    return {
      _id: Fire.uid,
      name: this.props.navigation.state?.params?.name || ''
    };
  }

  componentDidMount() {
    this.unsubscribe = Fire.get(message =>
      this.setState(previous => ({
        messages: GiftedChat.append(previous.messages, message)
      }))
    );
  }

  componentWillUnmount() {
    Fire.off(this.unsubscribe);
  }

  onSend = messages => {
    Fire.send(messages, this.user);
  };

  renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbarContainer}
        primaryStyle={styles.inputToolbarPrimary}
      />
    );
  };

  renderComposer = (props) => {
    return (
      <Composer
        {...props}
        textInputStyle={styles.composerTextInput}
        placeholder="Digite uma mensagem..."
      />
    );
  };

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={styles.bubbleWrapper}
        textStyle={styles.bubbleText}
      />
    );
  };

  renderAvatar = (props) => {
    return (
      <Avatar
        {...props}
        imageStyle={styles.avatarImage}
        containerStyle={styles.avatarContainer}
      />
    );
  };

  renderMessage = (props) => {
    const { currentMessage } = props;
    return (
      <React.Fragment>
        {currentMessage.image && (
          <Image
            style={styles.messageImage}
            source={require("./images/image1.png")}
          />
        )}
        <Bubble {...props} />
      </React.Fragment>
    );
  };

  render() {
    const chat = (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={this.user}
        renderInputToolbar={this.renderInputToolbar}
        renderComposer={this.renderComposer}
        renderBubble={this.renderBubble}
        renderAvatar={this.renderAvatar}
        renderMessage={this.renderMessage}
        showUserAvatar
      />
    );

    if (Platform.OS === "android") {
      return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          keyboardVerticalOffset={30}
          enabled
        >
          {chat}
        </KeyboardAvoidingView>
      );
    }

    return <SafeAreaView style={styles.container}>{chat}</SafeAreaView>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0"
  },
  inputToolbarContainer: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: "#ffffff"
  },
  inputToolbarPrimary: {
    alignItems: "center"
  },
  composerTextInput: {
    color: "#000",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#dddddd",
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 40
  },
  bubbleWrapper: {
    borderRadius: 10,
    marginBottom: 4
  },
  bubbleText: {
    color: "#ffffff"
  },
  avatarContainer: {
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 20,
    marginRight: 8
  },
  avatarImage: {
    borderRadius: 18
  },
  messageImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginTop: 4,
    marginLeft: -4,
    marginRight: 8
  }
});
