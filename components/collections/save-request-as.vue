<template>
  <modal v-if="show" @close="hideModal">
    <div slot="header">
      <div class="row-wrapper">
        <h3 class="title">{{ $t("save_request_as") }}</h3>
        <div>
          <button class="icon" @click="hideModal">
            <i class="material-icons">close</i>
          </button>
        </div>
      </div>
    </div>
    <div slot="body" class="flex flex-col">
      <label for="selectLabel">{{ $t("token_req_name") }}</label>
      <input type="text" id="selectLabel" v-model="requestData.name" @keyup.enter="saveRequestAs" />
      <ul>
        <li>
          <label for="selectCollection">{{ $t("collection") }}</label>
          <span class="select-wrapper">
            <select type="text" id="selectCollection" v-model="requestData.collectionIndex">
              <option :key="undefined" :value="undefined" hidden disabled selected>
                {{ $t("select_collection") }}
              </option>
              <option
                v-for="(collection, index) in $store.state.postwoman.collections"
                :key="index"
                :value="index"
              >
                {{ collection.name }}
              </option>
            </select>
          </span>
        </li>
      </ul>
      <label>{{ $t("folder") }}</label>
      <autocomplete
        :placeholder="$t('search')"
        :source="folders"
        :spellcheck="false"
        v-model="requestData.folderName"
      />
      <ul>
        <li>
          <label for="selectRequest">{{ $t("request") }}</label>
          <span class="select-wrapper">
            <select type="text" id="selectRequest" v-model="requestData.requestIndex">
              <option :key="undefined" :value="undefined">/</option>
              <option v-for="(folder, index) in requests" :key="index" :value="index">
                {{ folder.name }}
              </option>
            </select>
          </span>
        </li>
      </ul>
    </div>
    <div slot="footer">
      <div class="row-wrapper">
        <span></span>
        <span>
          <button class="icon" @click="hideModal">
            {{ $t("cancel") }}
          </button>
          <button class="icon primary" @click="saveRequestAs">
            {{ $t("save") }}
          </button>
        </span>
      </div>
    </div>
  </modal>
</template>

<script>
import { fb } from "~/helpers/fb"

export default {
  props: {
    show: Boolean,
    editingRequest: Object,
  },
  data() {
    return {
      defaultRequestName: "Untitled Request",
      requestData: {
        name: undefined,
        collectionIndex: undefined,
        folderName: undefined,
        requestIndex: undefined,
      },
    }
  },
  watch: {
    "requestData.collectionIndex": function resetFolderAndRequestIndex() {
      // if user has chosen some folder, than selected other collection, which doesn't have any folders
      // than `requestUpdateData.folderName` won't be reseted
      this.$data.requestData.folderName = undefined
      this.$data.requestData.requestIndex = undefined
    },
    "requestData.folderName": function resetRequestIndex() {
      this.$data.requestData.requestIndex = undefined
    },
    editingRequest({ name }) {
      this.$data.requestData.name = name || this.$data.defaultRequestName
    },
  },
  computed: {
    folders() {
      const collections = this.$store.state.postwoman.collections
      const collectionIndex = this.$data.requestData.collectionIndex
      const userSelectedAnyCollection = collectionIndex !== undefined
      if (!userSelectedAnyCollection) return []

      const noCollectionAvailable = collections[collectionIndex] !== undefined
      if (!noCollectionAvailable) return []

      return getFolderNames(collections[collectionIndex].folders, [])
    },
    requests() {
      const collections = this.$store.state.postwoman.collections
      const collectionIndex = this.$data.requestData.collectionIndex
      const folderName = this.$data.requestData.folderName

      const userSelectedAnyCollection = collectionIndex !== undefined
      if (!userSelectedAnyCollection) {
        return []
      }

      const userSelectedAnyFolder = folderName !== undefined && folderName !== ""

      if (userSelectedAnyFolder) {
        const collection = collections[collectionIndex]
        const folder = findFolder(folderName, collection)
        return folder.requests
      } else {
        const collection = collections[collectionIndex]
        const noCollectionAvailable = collection !== undefined

        if (!noCollectionAvailable) {
          return []
        }

        return collection.requests
      }
    },
  },
  methods: {
    syncCollections() {
      if (fb.currentUser !== null) {
        if (fb.currentSettings[0].value) {
          fb.writeCollections(JSON.parse(JSON.stringify(this.$store.state.postwoman.collections)))
        }
      }
    },
    saveRequestAs() {
      const userDidntSpecifyCollection = this.$data.requestData.collectionIndex === undefined
      if (userDidntSpecifyCollection) {
        this.$toast.error(this.$t("select_collection"), {
          icon: "error",
        })
        return
      }
      if (this.$data.requestData.name.length === 0) {
        this.$toast.error(this.$t("empty_req_name"), {
          icon: "error",
        })
        return
      }

      const requestUpdated = {
        ...this.$props.editingRequest,
        name: this.$data.requestData.name,
        collection: this.$data.requestData.collectionIndex,
      }

      this.$store.commit("postwoman/saveRequestAs", {
        request: requestUpdated,
        collectionIndex: this.$data.requestData.collectionIndex,
        folderName: this.$data.requestData.folderName,
        requestIndex: this.$data.requestData.requestIndex,
      })

      this.hideModal()
      this.syncCollections()
    },
    hideModal() {
      this.$emit("hide-modal")
    },
  },
}

function getFolderNames(folders, namesList) {
  if (folders.length) {
    folders.forEach((folder) => {
      namesList.push(folder.name)
      if (folder.folders && folder.folders.length) {
        getFolderNames(folder.folders, namesList)
      }
    })
  }
  return namesList
}

function findFolder(folderName, currentFolder) {
  let selectedFolder
  let result

  if (folderName === currentFolder.name) {
    return currentFolder
  }

  for (let i = 0; i < currentFolder.folders.length; i++) {
    selectedFolder = currentFolder.folders[i]

    result = findFolder(folderName, selectedFolder)

    if (result !== false) {
      return result
    }
  }
  return false
}
</script>
